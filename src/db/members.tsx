import {JSX} from "react";
import Image from "next/image";
import {Roboto_Mono} from "next/font/google";
import {LiaBirthdayCakeSolid} from "react-icons/lia";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {FaBluesky, FaKeybase, FaMarkdown, FaMastodon, FaXTwitter} from "react-icons/fa6";
import Link from "next/link";
import {FaGithub} from "react-icons/fa";
import {SiMisskey, SiQiita} from "react-icons/si";
import {Lang} from "@/components/lang";
import {Skills} from "@/components/skills";


export type MemberData = {
    name: string;
    description: string;
    links: {
        [key: string]: string;
    };
    skills?: [string, number][];
    languages?: { [lang: string]: number };
    additionalTags?: {
        birthday?: Date;
        sex?: "male" | "female" | "other";
        location?: string;
    },
    aboutMe: string;  // Markdown形式の自己紹介
}

const codeFont = Roboto_Mono({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap"
});

export class Member {
    id: string;
    data: MemberData;
    constructor(id: string, data: MemberData) {
        this.id = id;
        this.data = data;
    }

    getHtml(): JSX.Element {
        const properties: string[] = [this.id];
        switch (this.data.additionalTags?.sex) {
            case "male":
                properties.push("男");
                break;
            case "female":
                properties.push("女");
                break;
            case "other":
                properties.push("その他");
                break;
        }
        const innerProperty = properties.join(" · ")
        return (
            <div className="flex flex-row gap-6">
                <div className="p-1 ml-20">
                    <Image alt={`${this.data.name}のアイコン`} src={`/members/${this.id}.webp`} width={256} height={256} className="rounded-full mb-4 border border-gray-300 dark:border-gray-600"/>
                    <section>
                        <h2 className="text-2xl font-bold mb-1">{this.data.name}</h2>
                        <div className="text-sm mb-3 text-gray-700 dark:text-gray-400">
                            <p>
                                {(()=> {
                                    if (this.data.additionalTags?.birthday) {
                                        const birthElapsed = Date.now() - this.data.additionalTags?.birthday.getTime();
                                        const ageYear = Math.floor(birthElapsed / (1000 * 60 * 60 * 24 * 365.25))
                                        return <>
                                            <span>{innerProperty + " · "}</span>
                                            <span className="relative group">
                                                {ageYear}歳
                                                <span className="absolute opacity-0 group-hover:opacity-100 left-0 top-5 transition-opacity duration-150 text-xs flex items-center">
                                                    <LiaBirthdayCakeSolid size={14}/><span className="ml-1">{this.data.additionalTags.birthday.toLocaleDateString("ja-JP")}</span>
                                                </span>
                                            </span>
                                        </>

                                    }
                                    return innerProperty;
                                })()}
                            </p>
                        </div>
                        <p className="mb-4">{this.data.description}</p>
                        <div className="flex gap-2 flex-wrap dark:text-gray-200 text-gray-800">
                            {Object.entries(this.data.links).map(([key, value], i) => (
                                <Link href={value} key={i}>
                                    {(() => {
                                        switch (key.toLowerCase()) {
                                            case "github":
                                                return <FaGithub size={20}/>;
                                            case "twitter":
                                            case "x":
                                                return <FaXTwitter size={20}/>;
                                            case "misskey":
                                                return <SiMisskey size={20}/>;
                                            case "mastodon":
                                                return <FaMastodon size={20}/>;
                                            case "bluesky":
                                                return <FaBluesky size={20}/>;
                                            case "qiita":
                                                return <SiQiita size={20}/>;
                                            case "keybase":
                                                return <FaKeybase size={20}/>;
                                            default:
                                                return <span className="text-gray-800 hover:underline">{key}</span>;
                                        }
                                    })()}
                                </Link>)
                            )}
                        </div>
                    </section>

                </div>
                <div className="flex-1 mr-40">
                    <section className="px-6 py-4 rounded-lg border border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between">
                            <p className={`${codeFont.className} text-xs`}>about-me<span className="text-gray-500 dark:text-gray-400">.md</span></p>
                            <FaMarkdown size={16} className="text-gray-500" />
                        </div>
                        <div className="markdown-body">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {this.data.aboutMe}
                            </ReactMarkdown>
                        </div>
                    </section>
                    <div className="mt-8 px-6 space-y-10 mb-12">
                        {(this.data.languages || this.data.skills) ? <section className="max-w-full">
                            <h2 className="text-2xl font-bold">開発</h2>
                            <div className="flex flex-nowrap w-full h-120">
                                {this.data.skills ? <div className={"flex-2/3"}><Skills skills={this.data.skills!}/></div> : <></>}
                                {this.data.languages ? <div className={"flex-1/3"}><Lang languages={this.data.languages!}/></div> : <></>}
                            </div>
                        </section> : <></>}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">ブログ</h2>
                            <div className="text-gray-700 dark:text-gray-300">
                                <p className="text-sm">このメンバーのブログはまだありません。</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export const Members: { [key: string]: Member } = {
    "yossy4411": new Member(
        "yossy4411",
        {
            name: "おかゆ (yossy4411)",
            description: "おかゆグループ創設者・代表。",
            links: {
                "GitHub": "https://github.com/yossy4411",
                "Twitter": "https://x.com/yossy4411_dev",
                "Misskey": "https://okayugroup.net/@yossy4411",
                "Keybase": "https://keybase.io/yossy4411",
            },
            skills: [
                ["Web開発", 8],
                ["ネイティブアプリ開発", 9],
                ["プロジェクト管理", 7],
                ["チームビルディング", 8],
                ["バックエンド開発", 6],
                ["フロントエンド開発", 7],
                ["データベース設計", 4],
                ["UI/UXデザイン", 5],
                ["DevOps", 6],
                ["セキュリティ", 6],
                ["CI/CD", 6],
                ["API設計", 7],
            ],
            languages: {
                "Rust": 8,
                "TypeScript": 6.5,
                "JavaScript": 4,
                "Python": 3,
                "Go": 7,
                "C++": 2,

            },
            additionalTags: {
                birthday: new Date("2010-08-16"),
                location: "Shiga, Japan",
                sex: "male",
            },
            aboutMe: (
`# yossy4411
こんにちは！おかゆグループの代表を務めているおかゆです。

私は趣味のプログラミングを通じて、社会をより良いものにするための活動をしています。`
            )
        }
    )
}