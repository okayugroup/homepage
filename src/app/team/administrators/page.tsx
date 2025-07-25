import {Header} from "@/components/Header";
import type {Metadata} from "next";
import {AdminBody} from "@/app/layout";

export const metadata: Metadata = {
    title: "OkayuGroup Administrators | Home",
    description: "おかゆグループのプロジェクト管理とグループ全体の指揮・統括を行っています。",
};


export default function AdminPage() {
    return <AdminBody>
        <Header currentPath="/team/administrators" pane="admin" />
        <main className="mt-8 px-20">
            <section className="py-30">
                <h1 className="text-3xl font-bold">お知らせ</h1>
                <ul className="list-inside gap-6 mt-4 ml-8">
                    <li>おかゆグループ Administratorsの作成を開始<span className="text-sm">（2025/07/25更新）</span></li>
                </ul>
            </section>
        </main>
    </AdminBody>;
}