import {Header} from "@/components/Header";
import type {Metadata} from "next";
import {AdminBody} from "@/components/admin-body";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa6";
import {getProjects, toString, toColor, Project} from "@/db/projects";

export const metadata: Metadata = {
    title: "OkayuGroup Administrators | Home",
    description: "おかゆグループのプロジェクト管理とグループ全体の指揮・統括を行っています。",
};


export default function AdminPage() {
    return <AdminBody>
        <Header currentPath="/team/administrators" pane="admin" />
        <main className="mt-18 py-30 px-5 lg:px-60 space-y-40">
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
                    <div className="flex flex-row gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border-2 border-green-500">
                        <div className="p-3 w-2/5">
                            <h3 className="text-xl font-semibold">Misskeyサーバー</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">正常に動作しています。</p>
                        </div>
                        <div className="flex items-center justify-center bg-white/80 dark:bg-gray-700 rounded-md flex-1 p-4">
                            <span>ここにグラフ入れたいやんね🤔</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border-2 border-green-500">
                        <div className="p-3 w-2/5">
                            <h3 className="text-xl font-semibold">統合APIサーバー</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">正常に動作しています。</p>
                        </div>
                        <div className="flex items-center justify-center bg-white/80 dark:bg-gray-700 rounded-md flex-1 p-4">
                            <span>ここにグラフ入れたいやんね🤔</span>
                        </div>
                    </div>
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
    </AdminBody>;
}