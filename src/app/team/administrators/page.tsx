import {Header} from "@/components/Header";
import type {Metadata} from "next";
import {AdminBody} from "@/components/admin-body";

export const metadata: Metadata = {
    title: "OkayuGroup Administrators | Home",
    description: "おかゆグループのプロジェクト管理とグループ全体の指揮・統括を行っています。",
};


export default function AdminPage() {
    return <AdminBody>
        <Header currentPath="/team/administrators" pane="admin" />
        <main className="mt-18 py-30 px-60 space-y-40">
            <section>
                <h1 className="text-3xl font-bold">お知らせ</h1>
                <ul className="list-inside gap-6 mt-8 ml-4">
                    <li>おかゆグループ Administratorsを立ち上げました<span className="text-sm">（2025/07/26更新）</span></li>
                </ul>
            </section>
            <section>
                <h1 className="text-3xl font-bold">ブログ</h1>
                <div className="grid grid-cols-1 gap-6 mt-8">
                    ここには（まだ）何もありません。
                </div>
            </section>
            <section>
                <h1 className="text-3xl font-bold">プロジェクト</h1>
                <div className="grid grid-cols-1 gap-6 mt-8">
                    ここには（まだ）何もありません。（めんどくさいから書いてないだけ）
                </div>
            </section>
            <section>
                <h1 className="text-3xl font-bold">動作状況</h1>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                    <div className="flex flex-row gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border-2 border-green-500">
                        <div className="p-3">
                            <h2 className="text-xl font-semibold">サーバー</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">正常に動作しています。</p>
                        </div>
                        <div className="flex items-center bg-white/80 rounded-lg flex-1 p-4">
                            <span>ここにグラフ入れたい🤔</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </AdminBody>;
}