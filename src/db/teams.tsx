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
                        <section className="flex-3/5 space-y-6">
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
                        <section className="flex-2/5 space-y-4">
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