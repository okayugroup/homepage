import {JSX} from "react";
import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import Link from "next/link";
import {FaArrowRight, FaRegClock} from "react-icons/fa6";
import {BlogFindByDate} from "@/components/blog-finder";
import {TeamIcon} from "@/components/team-icon";
import {Footer} from "@/components/Footer";

export type History = {
    date: Date;
    description: string;
}

export type TeamData = {
    name: string;
    description: string;
    summary: JSX.Element;
    members: string[];
    founded: Date;
    links: {
        url: string;
        label: string;
    }[];
    roles: (string | JSX.Element)[];
    addition?: JSX.Element;
    history?: History[];
}

export class Team {
    id: string;
    data: TeamData;
    lastUpdated: Date;
    constructor(
        id: string,
        data: TeamData,
        lastUpdated: Date,
    ) {
        this.id = id;
        this.data = data;
        this.lastUpdated = lastUpdated;
    }

    getHtml(): JSX.Element {
        return <SharedBody type="admin">
            <Header currentPath={`/team/${this.id}`} />
            <div className="flex my-18 pl-5 xl:pl-20 gap-10">
                <main className="flex-3/4">
                    <div className="mt-10 py-5 mx-4 mb-4">
                        <div className="flex items-end mb-2">
                            <h1 className="text-3xl font-extrabold">{this.data.name}</h1>
                            <Link href="/team/" title="ほかのチームを見る" className="hover:underline">
                                <small className="px-2 text-lg font-bold">チーム</small>
                            </Link>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{this.data.description}</p>
                        <div className="flex items-center gap-2">
                            <FaRegClock size={14} className="h-full fill-gray-600 dark:text-gray-300" />
                            <p className="text-sm">
                                <span className="text-gray-400">最終更新: </span>
                                <BlogFindByDate className="text-gray-600 dark:text-gray-300" date={this.lastUpdated}/>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 mb-30">
                        <section className="flex-1 space-y-6">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                                <TeamIcon id={this.id} className="fill-foreground"/>
                            </div>
                            <section>
                                <h2 className="text-2xl font-bold">概要</h2>
                                <div className="space-y-4 text-gray-700 dark:text-gray-300 mt-2">
                                    {this.data.summary}
                                </div>
                            </section>
                        </section>
                        <div className="border-l-2 -my-4 border-l-gray-400 dark:border-gray-600"/>
                        <section className="w-60 space-y-4">
                            <section>
                                <h2 className="font-bold text-lg mb-2">設立</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        {
                                            (() => {
                                                if (!this.data.history) {
                                                    return <li className="font-semibold">
                                                        {this.data.founded.toLocaleDateString()} - 設立
                                                    </li>;
                                                } else {
                                                    return <>{this.data.history.filter(h => h.date < this.data.founded).map((h, i) =>
                                                        <li key={i}>
                                                            {h.date.toLocaleDateString()} - {h.description}
                                                        </li>
                                                    )}
                                                        <li className="font-semibold">
                                                            {this.data.founded.toLocaleDateString()} - 設立
                                                        </li>
                                                        {this.data.history.filter(h => h.date >= this.data.founded).map((h, i) =>
                                                            <li key={i}>
                                                                {h.date.toLocaleDateString()} - {h.description}
                                                            </li>
                                                        )}
                                                    </>
                                                }
                                            })()
                                        }
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">役割</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        {this.data.roles.map((role, i) => <li key={i}>{role}</li>)}
                                    </ul>
                                    <p>など</p>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">メンバー</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        <li><span className="font-semibold">{this.data.members[0]}</span> - 代表</li>
                                        {this.data.members.slice(1).map((member, i) => <li key={i}>{member}</li>)}
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">リンク</h2>
                                <nav className="mx-1 list-none">
                                    {this.data.links.map(({url, label}, i) =>
                                        <li key={i}>
                                            <Link href={url} className="group inline-flex">
                                                <FaArrowRight size={14} className="h-auto mr-2 transition-transform group-hover:translate-x-1"/>
                                                <span className=" text-blue-600 dark:text-blue-400 group-hover:underline">
                                                    {label}
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </nav>
                            </section>
                        </section>
                    </div>
                    <div className="space-y-20">
                        <section>
                            <h2 className="text-3xl font-bold">お知らせ</h2>
                            <ul className="list-inside gap-6 mt-8 ml-4">
                                <li>おかゆグループ Administratorsを立ち上げました<span className="text-sm">（2025/07/26）</span></li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-3xl font-bold">ブログ</h2>
                            <div className="grid grid-cols-1 gap-6 mt-8">
                                ここには（まだ）何もありません。
                            </div>
                        </section>
                        { this.data.addition }
                    </div>
                </main>
                <aside className="mt-20 rounded-l-2xl bg-gray-50 flex-1/4 p-8">
                    <h2 className="text-xl font-semibold">ここに書くことが思いつかないよおおおお</h2>
                </aside>
            </div>
            <Footer/>
        </SharedBody>;
    }
}


const SoftwareDevelopment =
    new Team(
        "software",
        {
            name:"ソフトウェア開発",
            description: "おかゆグループの総合的な管理",
            summary: <>
                <p>おかゆグループソフトウェア開発チームでは、ソフトウェア開発に力を注いでいます。これはおかゆグループの主な活動の一つです。</p>
                <p>私たちは、プロジェクトの進行やコードレビュー、バグの修正、ドキュメントの整備などを通じて、ソフトウェアの品質向上に努めています。</p>
                <p>新しい技術の導入や、効率的な開発プロセスの確立にも取り組んでいます。</p>
            </>,
            members: [ "yossy4411" ],
            founded: new Date("2024-10-01"),
            links: [
                {
                    label: "お問い合わせ",
                    url: "/contact?team=software"
                }
            ],
            roles: [
                "ソフトウェアの開発",
                "プロジェクトの進行",
                "コードレビュー",
                "バグの修正",
                "ドキュメントの整備",
            ],
        },
        new Date("2025-08-05")
    );

const Creators =
    new Team(
        "creators",
        {
            name:"クリエイター",
            description: "広報とデザイニング",
            summary: <>
                <p>おかゆグループクリエイターチームは、ソフトウェア等のデザインやSNSの運用を担当しています。</p>
                <p>私たちは、グループのイメージを向上させるために、魅力的なコンテンツの制作や、SNSでの情報発信に力を入れています。</p>
                <p>ソフトウェア面では、UI/UXの向上や、ユーザーフィードバックの収集を通じて、より使いやすい製品の開発に取り組んでいます。</p>
            </>,
            members: [ "yossy4411" ],
            founded: new Date("2025-08-06"),
            links: [
                {
                    label: "お問い合わせ",
                    url: "/contact?team=creators"
                }
            ],
            roles: [
                "ソフトウェアのデザイン",
                "SNSの運用",
                "コンテンツ制作",
                "UI/UXの向上",
                "ユーザーフィードバックの収集"
            ],
            history: [
                {
                    date: new Date("2024-08-05"),
                    description: "ソフトウェア開発チームからの分離"
                },
            ]
        },
        new Date("2025-08-05")
    );


function ServerUptimeCard({title}: { title: string }): JSX.Element {
    return (
        <div className="flex flex-col md:flex-row xl:flex-col 2xl:flex-row gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border-2 border-green-500">
            <div className="flex p-3 space-x-4
            flex-col sm:flex-row md:flex-col xl:flex-row 2xl:flex-col
            w-full md:w-2/5 xl:w-full 2xl:w-1/3">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">正常に動作しています。</p>
            </div>
            <div className="flex items-center justify-center bg-white/80 dark:bg-gray-700 rounded-md p-8 flex-1 mt-2 md:mt-0">
                <span>ここにグラフ入れたいやんね🤔</span>
            </div>
        </div>
    );
}

const Admin =
    new Team(
        "administrators",
        {
            name: "Administrators",
            description: "おかゆグループの総合的な管理",
            summary: <>
                <p>おかゆグループ
                    Administratorsは、グループ全体の運営を行うチームです。私たちは、プロジェクトの管理やメンバーのサポートを通じて、グループの活動を円滑に進めることを目指しています。</p>
                <p>新しいプロジェクトの企画や、イベントの運営などにも積極的にチャレンジしています。</p>
            </>,
            members: ["yossy4411"],
            founded: new Date("2025-08-01"),
            links: [
                {
                    label: "お問い合わせ",
                    url: "/contact?team=administrators"
                }
            ],
            roles: [
                "プロジェクトの管理",
                "メンバーのサポート",
                "グループの方針の決定",
                "お問い合わせの振り分け",
                "サーバーの管理",
                "スケジュールの調整"
            ],
            addition: <section>
                <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-bold">動作状況</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">最終更新: 2025/07/26<span
                        className="text-rose-700"> っていうふうに見せかけてるだけ</span></p>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                    <ServerUptimeCard title="Misskeyサーバー"/>
                    <ServerUptimeCard title="プロジェクト管理サーバー"/>
                </div>
            </section>,
            history: [{date: new Date("2025-07-16"), description: "設立を検討開始"}],
        },
        new Date("2025-08-04"),
    );

export const Teams: { [id: string]: Team } = {
    "administrators": Admin,
    "software": SoftwareDevelopment,
    "creators": Creators,
}