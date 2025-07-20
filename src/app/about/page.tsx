import {Header} from "@/components/Header";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 pl-5 border-l-8 border-l-cyan-300 dark:border-l-cyan-950">
            {title}
            <span className="text-gray-500 dark:text-gray-400 ml-2 text-xl font-light">
                - {subtitle}
            </span>
        </h2>
        {children}
    </div>
}


export default function Home() {
    return <>
        <Header currentPath="/about" />
        <main className="flex flex-col justify-center gap-4">
            <div className="pt-20 pb-5 text-center bg-gray-600 dark:bg-blue-900">
                <h1 className="text-white font-semibold text-3xl">私たちについて</h1>
                <p className="text-gray-300 text-sm px-5 mt-1">
                    おかゆグループは、滋賀県を拠点にする学生のグループです。
                </p>
            </div>
            <section className="px-10 lg:px-30 space-y-6 lg:space-y-10 mt-5">
                <Card title="Introduction" subtitle="おかゆグループってなに？">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        おかゆグループは、滋賀県を拠点に活動する学生団体。
                        学生の視点から、地域社会に貢献することを目指しているよ！
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        私たちは、ソフトウェア開発を通じて、地域の課題解決や社会貢献に取り組んでいます。
                        また、メンバー同士のスキルアップや知識共有に重点を置き、楽しく活動しています！
                    </p>
                </Card>
                <Card title="What We Do?" subtitle="活動内容">
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
                <Card title="Our Teams" subtitle="活動形態">
                    <div className="p-4 grid grid-cols-3 gap-4">
                        <Link href="/team/administrators" className="hover:scale-102 transition-transform duration-300">
                            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Image alt="OkayuGroup Project Team" src="https://picsum.photos/1200/600" width="1200" height="600" className="w-full"/>
                                <div className="px-6 py-4">
                                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                        OkayuGroup Administrators
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        おかゆグループの運営とプロジェクトの推進を担当するチームです。
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Link href="/team/software" className="hover:scale-102 transition-transform duration-300">
                            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Image alt="OkayuGroup Project Team" src="https://picsum.photos/1200/600?a=1" width="1200" height="600" className="w-full"/>
                                <div className="px-6 py-4">
                                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                        ソフトウェア開発部
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        ソフトウェア開発を中心に、社会の課題解決に取り組みます。
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Card>
            </section>
        </main>
    </>;
}