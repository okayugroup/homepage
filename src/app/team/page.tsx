import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import React from "react";
import Link from "next/link";
import {SharedBody} from "@/components/shared-body";
import {TeamIcon} from "@/components/team-icon";

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

function Team({children, title, image, link}: { children: React.ReactNode, title: string, image: string, alt: string, link?: string } ) {
    const linkAddress = link == null ? "/team/preparing" : "/team/" + link;
    return <Link href={linkAddress}>
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow duration-300">
            <TeamIcon id={image} width={600} height={200} className="w-full bg-white text-black"/>
            <div className="px-6 py-4">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    {title}
                </h3>
                { children }
            </div>
        </div>
    </Link>
}


export default function Home() {
    return <SharedBody>
        <Header currentPath="/team" />
        <main className="flex flex-col justify-center gap-4 mb-16">
            <div className="pt-20 pb-5 text-center bg-gray-600 dark:bg-blue-900">
                <h1 className="text-white font-semibold text-3xl">チーム</h1>
                <p className="text-gray-300 text-sm px-5 mt-1">
                    おかゆグループのチーム一覧
                </p>
            </div>
            <div className="px-10 lg:px-30 space-y-6 lg:space-y-10 mt-5">
                <div className="grid grid-cols-3 gap-4">
                    <Team alt="おかゆグループ Administrators" image="administrators" link="administrators" title="OkayuGroup Administrators">
                        <p className="text-gray-600 dark:text-gray-400">
                            おかゆグループの運営とプロジェクトの推進を担当するチームです。
                        </p>
                    </Team>
                    <Team alt="com.okayugroup.SoftwareDevelopment - おかゆグループソフトウェア開発部" image="software" link="software" title="ソフトウェア開発部">
                        <p className="text-gray-600 dark:text-gray-400">
                            ソフトウェア開発を中心に、社会の課題解決に取り組みます。
                        </p>
                    </Team>
                    <Team alt="おかゆグループクリエイターチーム" image="creators" link="creators" title="クリエイターチーム">
                        <p className="text-gray-600 dark:text-gray-400">
                            動画制作やデザインなど、クリエイティブな活動を行うチームです。
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                            → おかゆグループ公式YouTube、SNSなど
                        </p>
                    </Team>
                    <Team alt="おかゆグループ 推し活応援倶楽部！（仮称）" image="favorite" title="推し活応援倶楽部！（仮）">
                        <p className="text-gray-600 dark:text-gray-400">
                            推しを応援するためのチームです。おかゆグループの活動とはまた別のベクトルとして、メンバーの好きなことを応援します。
                        </p>
                    </Team>
                </div>
            </div>
        </main>
        <Footer/>
    </SharedBody>;
}