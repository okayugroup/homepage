---
title: "Rustのクロスコンパイルに振り回された話"
date: 2025-01-11
author: yossy4411
categories: 
  - "雑記"
  - "アプリ開発"
tags: 
  - "rust"
---

## Rust、始めました

私がインフルにかかったとき、あまりにも暇だったため、Rustの勉強をすることにしました。

そこで分かったことは、Rustでは[cross](https://github.com/cross-rs/cross)というツールを利用してクロスコンパイルができるということです。
<!--more-->
## crossについて

### crossの仕組み

噛み砕いて言うと、Rustで書いたコードを、Dockerコンテナ内でコンパイルするというものです。

Dockerは、PC内に仮想環境を作り、そこで動かすことのできるツールで、これにより環境に縛られないビルドやテストなどを実行できるようになったため、主にクロスコンパイルやCI/CDとして利用されています。

### インストール

Crossの強みは、そのインストールの容易さにもあります。

```shell
cargo install cross --git https://github.com/cross-rs/cross
```

驚かないでください。  
なんと、これだけなんです！

というのも、Rustのコンパイラがもともとクロスコンパイルをサポートするように設計されているため、少ない手順でセットアップができるようになっているのです。

## crossでクロスコンパイルしてみよう！

```shell
cargo new test-project  # 新しいプロジェクトを作る
```

```rs
// main.rs

fn main() {
  println!("Hello World!");
}
```

適当にHelloWorldを組んでみました。

普通なら `cargo build --release` でコンパイルすると思いますが、今日はここでcrossを使ってみます。

### 1\. ターゲットを追加

まず、rustupコマンドを使用してターゲットを使用できるようにします。

```
rustup target add <target>
```

ここでのターゲットは、システムのアーキテクチャを指します。  
例えば、aarch64-unknown-linux-gnu (Raspberry Pi 4+) などですね。

```
rustup target list
```

で一覧を見ることができます。

注）稀にツールチェーンのインストールをしないといけないことがあります:

```
rustup toolchain install stable-x86_64-unknown-linux-gnu
```

### 2\. crossでコンパイル

```
cross build --target aarch64-unknown-linux-gnu  # 適切なターゲットを指定してください
```

基本はcargoを差し替えるようにして利用できます。

※普通に比べ速度が制限されるため、少しコンパイル時間が伸びることがあります。

しばらくすると、cargoでビルドした場合と同じようにビルド終了のログが流れ、ビルドが終了します。また、通常通りtargetディレクトリにビルド結果が残されます。

### 3\. 実機で実行

ビルド結果の実行可能ファイルを実機にコピーして実行すれば、終わりです。

ありがとうございました。

## ここで問題が...

ですが、終わりません。

上記の方法では、**普通のライブラリで構成される**プロジェクトであれば問題なく動作します。

たまに`OpenSSL`に依存するライブラリやクレートを含む場合があり、その場合うまくいかないことがあります。

結論からいいますと、実行するDockerイメージにOpenSSLが入っていないことが原因です。

### 解決策

ここではlinux-x86\_64を例にとって説明します。

まず、実行するDockerイメージをカスタマイズします。これはDockerfileを編集することで行われます。

```dockerfile
FROM rustembedded/cross:x86_64-unknown-linux-gnu-0.2.1

COPY openssl.sh /
RUN bash /openssl.sh linux-x86_64

ENV OPENSSL_DIR=/openssl \
    OPENSSL_INCLUDE_DIR=/openssl/include \
    OPENSSL_LIB_DIR=/openssl/lib \
    OPENSSL_STATIC=1
```

ここで使用されているopenssl.shは以下の通り

[https://github.com/cross-rs/cross/blob/v0.1.16/docker/openssl.sh](https://github.com/cross-rs/cross/blob/v0.1.16/docker/openssl.sh)をそれなりに編集

```sh
set -ex

main() {
    local version=1.0.2t
    local os=$1 \
          triple=$2

    local dependencies=(
        ca-certificates
        curl
        m4
        make
        perl
    )

    # NOTE cross toolchain must be already installed
    apt-get update
    local purge_list=()
    for dep in ${dependencies[@]}; do
        if ! dpkg -L $dep; then
            apt-get install --no-install-recommends -y $dep
            purge_list+=( $dep )
        fi
    done

    td=$(mktemp -d)

    pushd $td
    curl -L https://www.openssl.org/source/openssl-$version.tar.gz | \
        tar --strip-components=1 -xz
    AR=${triple}ar CC=${triple}gcc ./Configure \
      --prefix=/openssl \
      no-dso \
      $os \
      -fPIC \
      ${@:3}
    nice make -j$(nproc)
    make install

    # clean up
    apt-get purge --auto-remove -y ${purge_list[@]}

    popd

    rm -rf $td
    rm $0
}

main "${@}"
```

```
docker build . -t <tag>
```

でDockerイメージをビルドしてください。  
<tag>の内容は大体なんでもいいですが、後で使うのでメモしといてください。

次に、このイメージをcrossで使用します。  
~/Cross.tomlを作成し、以下のように書きます。

```toml
[target.x86_64-unknown-linux-gnu]
image = "<tag>"
```

最後に、コンパイルします。

```sh
cross build --release --target x86_64-unknown-linux-gnu
```

カスタマイズされたDockerでクロスコンパイルが実行されるので、工程を間違えない限り成功します。

## ここで問題が...②

aarch64-unknown-linux-gnuターゲットでビルドする場合、最後に失敗することがあります。  
これはリンカが正しく動かないからです。原因はよくわかりませんが。

解決策は、aarch64-unknown-linux-muslをターゲットとして使用することです。

musl向けにコンパイルしたらgnuで動かないんじゃ？って思うかもしれませんが、心配いりません。  
そこに壁はありませんので安心してください。

## 結論

Rustはクロスコンパイルも簡単？にできます。

最近できた言語なので、これからの成長に期待したいところですね。

## 参考

[crossでOpenSSLを静的リンクしてビルドする - Qiita](https://qiita.com/K2Da/items/3f3b7175fb42a6b7bc91)
