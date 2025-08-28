---
title: "Linuxでもゲームがしたい！"
date: 2025-02-21
author: yossy4411
categories:
    - 雑記
tags:
    - Linux
    - ゲーム
---

ふと思いました。Linuxではゲームはできるのか？

というわけで調べてみたところ、  
Linuxは開発やサーバーに使われるのが基本的ですが、最近はNVIDIAドライバの対応も進んできていて、どうやら**ゲームもできてしまう**ようです。

というわけで、Linuxでゲームに挑戦していきたいと思います。
<!--more-->
## NVIDIAドライバに対応したOS

基本的に、メジャーなOS(Ubuntu/Debian, Fedora, ArchLinux...)にはNVIDIA公式からのサポートがあります。（実際に私が試したのはUbuntuとFedoraのみなので注意）

ただぁ！

僕は開発もやりたいんだ！  
というわけでUbuntu系にします。

https://blog.okayugroup.com/2025/02/17/%e3%83%a1%e3%82%a4%e3%83%b3pc%e3%81%abubuntu%e3%82%92%e5%85%a5%e3%82%8c%e3%81%a6%e3%81%bf%e3%81%9f

実際にUbuntuを入れたときのブログです。Ubuntu Desktopを使ってもいいのですが、これだけでは遊び心が足りない（中二の心）感じがするので、別のものを使ってみました。

<figure>

![](images/image-15-1024x577.png)

<figcaption>

引用元：[https://support.system76.com/articles/pop-basics/](https://support.system76.com/articles/pop-basics/)

</figcaption>

</figure>

Ubuntu系にも、ゲーム用に最適化されたPop!\_OSというものがあります。  
試しましたが、なんとなくデザインなどが気に入らなかったので不採用となりました。

さて、ここで私が選択したのは、Zorin OSというものです。

<figure>

![](images/image-16-1024x640.png)

<figcaption>

引用元[https://pc-freedom.net/linux/about-zorin-os/](https://pc-freedom.net/linux/about-zorin-os/)

</figcaption>

</figure>

見た目がWindowsに似ているので、なんとなく( ・∀・)ｲｲ!!（完全なる好み）

しかも、NVIDIAドライバにも対応しているみたいです。

これ使おうぜ！

## Zorin OSをインストール

めんどいから書きたくないけど

[https://zorin.com/os/download](https://zorin.com/os/download)からISOイメージをダウンロードしてBalenaEtcherとかで書き込むだけや

あとはインストーラーに従っとけば大丈夫

## カスタマイズ

### Floorpをインストール

![](images/Screenshot-from-2025-02-17-19-40-30-1024x707.png)

まずいつもどおりFloorpをインストールしておきます。ストアにあります。

知らない方に説明しておくと、このブラウザは日本人によって開発されたFirefoxベースのブラウザです。

### OBS Studioをインストール

録画・配信ソフトです。

これもストアから入ります。

![](images/image-20-1024x707.png)

### Steamをインストール

![](images/Screenshot-from-2025-02-17-21-37-34-1024x707.png)

ストアからFlathub経由で入ります。

![](images/image-17-1024x640.png)

英語やんけ（Settings > Interface > Steam Client Languageから変更可能）

![](images/image-18-1024x640.png)

## ゲームをやる（本編）

### CSL2（失敗）

ここからが本題です。  
ゲームをインストールしていきましょう。

![](images/image-19-1024x640.png)

CSL2をインストール、、、**できねえじゃねーか**！

でも待ってください！

この問題は、Protonを使えば解決します。

> Protonとは、WindowsゲームをLinuxで動かすための互換性ソフトウェアです。

有効化は簡単で、設定＞互換性より「他のすべてのタイトルでSteam Playを有効化」をオンにすれば解決します。

![](images/image-21.png)

何をしたかというと、Steamには公式からProtonというものが提供されていて、これは**Windows向けゲームをLinuxおよびMacOSで実行できるようにする**という機能をもたらします。

![](images/image-22-1024x640.png)

これでインストールができるわけですね！（画像ではもうインストールしちゃったんですが...）

まずはちゃんと起動できるか、試してみましょう！

![](images/Screenshot-from-Screencast-from-2025-02-21-18-16-03.webm-1024x576.png)

Protonは公式開発かつ[オープンソース](https://github.com/ValveSoftware/Proton)なので、このくらいなら楽勝なのです。

ただ！ゲームを開くとこの状況は一転します。

![](images/Screenshot-from-Screencast-from-2025-02-21-18-16-03.webm-1-1-1024x576.png)

表示はできるんですよ？できるんですけど、、、

![](images/Screenshot-from-Screencast-from-2025-02-21-18-16-03.webm-2.png)

１FPSってなんやねん！！**こんなんで遊べるかよボケ**

色々調べたのですが、NVIDIAで動いていますし、最低品質にしても問題は解消しませんでした...  
リソースの読み込み（ディスク読み込み）で明らかな速度低下が見られています。

きっとWineのバグでしょう。今後修正していくつもりです。

### CSL （ネイティブ）（失敗）

Protonがだめなら、Linuxを標準サポートしているCSLで試してみます。

![](images/image-25-1024x640.png)

お願い！うまく行ってくれ！

![](images/image-26-1024x536.png)

まあそこまではいけるでしょう

Windowsダブルブートして

![](images/image-27-1024x576.png)

あああフォントがああ

![](images/image-28-1024x576.png)

何がどれかわかんねーよ

![](images/image-29-1024x576.png)

MODの有効化に時間がかかりました

![](images/image-30-1024x576.png)

急なLinuxへの優しさに感謝

ところが...

**ゲームを開いたら落ちました。**

なんでやねん！！！

ならば

### CSL（MOD一部無効化）

MODが悪さしているのではないか？と思いましたので、重そうなMODをすべて無効化します。

主は英検2級なので八割型理解可能ですが、読者の中には英語が理解できない方ももちろんいるでしょうから、今後修正していくべきだと感じています。

![](images/image-31-1024x576.png)

とは言いながらも、すんなり起動しました。

![](images/image-32-1024x657.png)

**さっき落ちたの絶対メモリ不足やん...**

せっかくなのでちょっと遊んで帰りましょうか。

![](images/image-34-1024x576.png)

普通にヌルヌルでおもろい  
昔はMODありでやってたんですが（今はCSL2）、バニラでも結構楽しいですね...

![](images/image-35.png)

強さ9.6（現実でのM7-8程度）の地震が起きるってさ。終わったかもしれん。

![](images/image-36-1024x707.png)

終わった。

## まとめ

結論としては、

「Linuxでもゲームをする方法はあるが、  
**ネイティブサポート**されたゲームでなければ別のOSを選べ。」

ということになります。

パフォーマンス上の観点からも、よほどの理由がない限りはWindowsとのデュアルブート環境を整備するのが一番だと思います。（私もそうします）

ありがとうございました！
