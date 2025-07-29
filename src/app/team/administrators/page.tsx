import {Header} from "@/components/Header";
import type {Metadata} from "next";
import {AdminBody} from "@/components/admin-body";
import {FaArrowRight} from "react-icons/fa";

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
                <div className="grid grid-cols-1 gap-6 mt-8">
                    ここには（まだ）何もありません。（めんどくさいから書いてないだけ）
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
                <div
                    className="bg-background rounded-2xl mt-8 border dark:border-2 overflow-clip flex items-center max-h-56 justify-between group transition-transform duration-200 active:scale-98"
                >
                    <div className="relative w-full h-30">
                        <svg viewBox="0 0 750 224"
                             preserveAspectRatio="none"
                             className="w-full min-h-full transition-transform duration-400 group-hover:scale-104 "
                        >
                            <path className="fill-gray-200 dark:fill-gray-900" d="M0 0h740.86l-45.127 224.222H0Z"/>
                            <path className="fill-gray-300 dark:fill-gray-800" d="M546.955 0H740.86l-45.127 224.222H501.828Z"/>
                            <path className="fill-gray-400 dark:fill-gray-700" d="M587.491 0H740.86l-45.127 224.222H542.365Z"/>
                            <path className="fill-gray-500 dark:fill-gray-600" d="M636.13 0h104.73l-45.127 224.222h-104.73Z"/>
                            <path className="fill-gray-600 dark:fill-gray-500" d="M689.256 0h51.604l-45.127 224.222H644.13Z"/>
                        </svg>
                        <div className="absolute z-10 max-py-4 left-5 top-0 h-full flex items-center flex-wrap md:flex-nowrap space-x-2 font-black text-3xl lg:text-2xl xl:text-4xl 2xl:text-5xl">
                            <p>おかゆグループ</p>
                            <p>お問い合わせフォーム</p>
                        </div>
                    </div>
                    <FaArrowRight size={48} className="mr-4 hidden md:block lg:block transition-transform duration-200 group-hover:translate-x-4"/>
                </div>
            </section>
        </main>
        <footer className="text-center py-10 border-t border-t-gray-200 dark:border-t-gray-700">
            <p>&copy; 2025 おかゆグループ Administrators</p>
        </footer>
    </AdminBody>;
}