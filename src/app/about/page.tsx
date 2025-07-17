import {Header} from "@/components/Header";
import React from "react";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 pl-5 border-l-8 border-l-cyan-300 dark:border-l-cyan-950">{title}</h2>
        {children}
    </div>
}


export default function Home() {
    return <>
        <Header currentPath="/about" />
        <main className="flex flex-col justify-center gap-4">
            <div className="pt-20 pb-5 text-center bg-blue-900 mb-10">
                <h1 className="font-semibold text-3xl">私達について</h1>
                <p className="text-gray-300 text-sm px-5">
                    おかゆグループは、滋賀県を拠点に、学生を中心として活動するソフトウェア開発部です。
                </p>
            </div>
            <section className="px-10 lg:px-30 space-y-6">
                <Card title="おかゆグループとは？">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        おかゆグループは、滋賀県を拠点に活動するソフトウェア開発部です。
                        主に学生を中心としたメンバーで構成されており、地域社会に貢献することを目指しています。
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        私たちは、ソフトウェア開発を通じて、地域の課題解決や社会貢献に取り組んでいます。
                        また、メンバー同士のスキルアップや知識共有を大切にし、楽しく活動しています。
                    </p>
                </Card>
                <Card title="活動内容">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        おかゆグループでは、以下のような活動を行っています。
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                        <li>地域のイベントやプロジェクトへの参加</li>
                        <li>ソフトウェア開発に関する勉強会やワークショップの開催</li>
                        <li>オープンソースプロジェクトへの貢献</li>
                        <li>メンバー同士のスキルアップを目的としたプロジェクトの実施</li>
                    </ul>
                </Card>
            </section>
        </main>
    </>;
}