import {Header} from "@/components/Header";
import type {Metadata} from "next";
import Link from "next/link";
import {FaArrowRight, FaClock, FaRegClock} from "react-icons/fa6";
import {getProjects, toString, toColor} from "@/db/projects";
import {JSX} from "react";
import {SharedBody} from "@/components/shared-body";
import {IAdministrators} from "@/components/icons";
import {BlogFindByDate} from "@/components/blog-finder";

export const metadata: Metadata = {
    title: "OkayuGroup Administrators | Home",
    description: "おかゆグループのプロジェクト管理とグループ全体の指揮・統括を行っています。",
};

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

export default function AdminPage() {
    return <SharedBody type="admin">
        <Header currentPath="/team/administrators" />
        <main className="my-18 px-5 xl:px-60">
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
                <section>
                    <div className="flex items-end justify-between">
                        <h2 className="text-3xl font-bold">動作状況</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">最終更新: 2025/07/26<span className="text-rose-700"> っていうふうに見せかけてるだけ</span></p>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                        <ServerUptimeCard title="Misskeyサーバー"/>
                        <ServerUptimeCard title="プロジェクト管理サーバー"/>
                    </div>
                </section>
                <section>
                    <h2 className="text-3xl font-bold">お問い合わせ</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        OkayuGroup Administratorsでは、プロジェクト、メンバーならびにグループ全体についてのご不明点やご意見をお待ちしております。
                    </p>
                    <Link href="/contact?team=administrators" className="group">
                        <p className="mt-4 inline-flex">
                            <FaArrowRight size={16} className="h-auto mr-3 transition-transform group-hover:translate-x-1.5"/>
                            <span className=" text-blue-600 dark:text-blue-400 group-hover:underline">
                                おかゆグループ Administratorsへのお問い合わせ
                            </span>
                        </p>
                    </Link>
                </section>
            </div>
        </main>
    </SharedBody>;
}