import {JSX} from "react";
import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import Link from "next/link";
import {FaArrowRight, FaRegClock} from "react-icons/fa6";
import {BlogFindByDate} from "@/components/blog-finder";
import {IAdministrators} from "@/components/icons";
import {Footer} from "@/components/Footer";

export class Team {
    id: string;
    name: string;
    description: string;
    summary: JSX.Element;
    members: string[];
    lastUpdated: Date;
    founded: Date;
    links: {
        url: string;
        label: string;
    }[];
    roles: (string | JSX.Element)[];
    addition?: JSX.Element;
    constructor(
        id: string,
        name: string,
        description: string,
        summary: JSX.Element,
        members: string[],
        lastUpdated: Date,
        founded: Date,
        links: { url: string; label: string }[],
        roles: (string | JSX.Element)[],
        addition?: JSX.Element
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.summary = summary;
        this.members = members;
        this.lastUpdated = lastUpdated;
        this.founded = founded;
        this.links = links;
        this.roles = roles;
        this.addition = addition;
    }

    getHtml(): JSX.Element {
        return <SharedBody type="admin">
            <Header currentPath="/team/administrators" />
            <div className="flex my-18 pl-5 xl:pl-20 gap-10">
                <main className="flex-3/4">
                    <div className="mt-10 py-5 mx-4 mb-4">
                        <div className="flex items-end mb-2">
                            <h1 className="text-3xl font-extrabold">Administrators</h1>
                            <Link href="/team/" title="ほかのチームを見る" className="hover:underline">
                                <small className="px-2 text-lg font-bold">チーム</small>
                            </Link>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">おかゆグループの総合的な管理</p>
                        <div className="flex items-center gap-2">
                            <FaRegClock size={14} className="h-full fill-gray-600 dark:text-gray-300" />
                            <p className="text-sm">
                                <span className="text-gray-400">最終更新: </span>
                                <BlogFindByDate className="text-gray-600 dark:text-gray-300" date={new Date("2025-08-02")}/>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 mb-30">
                        <section className="flex-3/5 space-y-6">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                                <IAdministrators className="fill-foreground"/>
                            </div>
                            <section>
                                <h2 className="text-2xl font-bold">概要</h2>
                                <div className="space-y-4 text-gray-700 dark:text-gray-300 mt-2">
                                    <p>おかゆグループ Administratorsは、グループ全体の運営を行うチームです。私たちは、プロジェクトの管理やメンバーのサポートを通じて、グループの活動を円滑に進めることを目指しています。</p>
                                    <p>新しいプロジェクトの企画や、イベントの運営などにも積極的にチャレンジしています。</p>
                                </div>
                            </section>
                        </section>
                        <div className="border-l-2 -my-4 border-l-gray-400 dark:border-gray-600"/>
                        <section className="flex-2/5 space-y-4">
                            <section>
                                <h2 className="font-bold text-lg mb-2">設立</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        <li>2025/07/16 - 設立を検討開始</li>
                                        <li>2025/08/01 - 公式設立</li>
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">役割</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        <li>プロジェクトの管理</li>
                                        <li>メンバーのサポート</li>
                                        <li>グループの方針の決定</li>
                                        <li>お問い合わせの振り分け</li>
                                        <li>サーバーの管理</li>
                                        <li>スケジュールの調整</li>
                                    </ul>
                                    <p>など</p>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">メンバー</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        <li><span className="font-semibold">yossy4411</span> - 代表</li>
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">リンク</h2>
                                <nav className="mx-1">
                                    <Link href="/contact?team=administrators" className="group">
                                        <p className="inline-flex">
                                            <FaArrowRight size={14} className="h-auto mr-2 transition-transform group-hover:translate-x-1"/>
                                            <span className=" text-blue-600 dark:text-blue-400 group-hover:underline">
                                                お問い合わせ
                                            </span>
                                        </p>
                                    </Link>
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
                        { this.addition }
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