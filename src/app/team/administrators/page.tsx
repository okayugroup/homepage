import {Header} from "@/components/Header";
import type {Metadata} from "next";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa6";
import {getProjects, toString, toColor} from "@/db/projects";
import {JSX} from "react";
import {SharedBody} from "@/components/shared-body";
import {IAdministrators} from "@/components/icons";

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
        <main className="mt-18 px-5 lg:px-60">
            <div className="mt-10 py-5 mx-4 mb-2">
                <div className="flex items-end mb-2">
                    <h1 className="text-3xl font-extrabold">Administrators</h1>
                    <Link href="/team/" title="ほかのチームを見る" className="hover:underline">
                        <small className="px-2 text-lg font-bold">チーム</small>
                    </Link>
                </div>
                <p className="text-gray-700 dark:text-gray-300">おかゆグループの総合的な管理</p>
            </div>
            <div className="flex gap-12">
                <section className="flex-1/2">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                        <IAdministrators className="fill-foreground"/>
                    </div>
                </section>
                <section className="flex-1/2 space-y-4">
                    <section>
                        <h2 className="font-bold text-lg mb-2">設立</h2>
                        <p className="mb-2">おかゆグループの管理を階層化するために設立されました。</p>
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
                </section>
            </div>
            <section className="my-10 py-5">
            </section>
            <section>
                <h2 className="text-3xl font-bold">お知らせ</h2>
                <ul className="list-inside gap-6 mt-8 ml-4">
                    <li>おかゆグループ Administratorsを立ち上げました<span className="text-sm">（2025/07/26更新）</span></li>
                </ul>
            </section>
            <section>
                <h2 className="text-3xl font-bold">ブログ</h2>
                <div className="grid grid-cols-1 gap-6 mt-8">
                    ここには（まだ）何もありません。
                </div>
            </section>
            <section>
                <h2 className="text-3xl font-bold">プロジェクト</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-8">
                    ここでは子プロジェクトなどの詳しい情報を表示していません。すべてのプロジェクトは<a href="https://projects.okayugroup.com" className="text-blue-600 dark:text-blue-400 hover:underline">こちら</a>からご覧いただけます。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8">
                    { getProjects().map((project, i) => (
                        <div key={i} className="rounded-xl border overflow-hidden">
                            <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 px-4 py-2">
                                <Link href={`https://projects.okayugroup.com/${project.id}`} className="hover:underline">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{project.title}</h3>
                                </Link>
                                <span className={`mt-2 inline-block px-3 py-1 text-sm font-medium rounded-full ${toColor(project.status)}`}>
                                    {toString(project.status)}
                                </span>
                            </div>
                            <div className="p-3 bg-background dark:bg-gray-800">
                                <p className="text-gray-600 dark:text-gray-400">{project.desc}</p>
                                { (() => {
                                    if (!project.children) {
                                        return <></>
                                    } else {
                                        return <div className="mt-3">
                                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">子プロジェクト</h4>
                                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                                {project.children.map((child, index) => (
                                                    <li key={index} className="text-gray-600 dark:text-gray-400">
                                                        <Link href={`https://projects.okayugroup.com/${child.id}`} className="hover:underline">
                                                            {child.title}
                                                        </Link>
                                                        <span className={`ml-1 inline-block px-2 py-1 text-xs font-medium rounded-full ${toColor(child.status)}`}>
                                                            ({toString(child.status)})
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                })()}
                            </div>
                        </div>
                    )) }
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
        </main>
        <footer className="text-center py-10 border-t border-t-gray-200 dark:border-t-gray-700">
            <p>&copy; 2025 おかゆグループ Administrators</p>
        </footer>
    </SharedBody>;
}