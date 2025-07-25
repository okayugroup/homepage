import {Header} from "@/components/Header";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "OkayuGroup Administrators | Home",
    description: "おかゆグループのプロジェクト管理とグループ全体の指揮・統括を行っています。",
};


export default function AdminPage() {
    return <>
        <Header currentPath="/team/administrators" pane="admin" />
        <main className="px-16">

        </main>
    </>;
}