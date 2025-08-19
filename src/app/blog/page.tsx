"use client";

import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import {Members} from "@/db/members";
import Image from "next/image";
import {JetBrains_Mono} from "next/font/google";


const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["500"],
    display: "swap",
    variable: "--font-jetbrains-mono"
})

export default function BlogPage() {
    const today = new Date();

    return (
        <SharedBody>
            <Header currentPath={"/blog/"} pane={"blog"}/>
            <aside className="fixed bg-gray-200 z-50 left-0 top-20 bottom-2 w-80 rounded-r-xl pr-4 py-6 overflow-y-auto">
                <section className="mb-6">
                    <h2 className="font-bold text-xl mx-4 mb-4">カテゴリ</h2>
                    <ul className="pr-2 flex flex-col space-y-1">
                        {["お知らせ", "イベント", "技術", "地域貢献"].map((category, i) => (
                            <li key={i} className="p-0.5 pl-8 bg-gray-500 text-gray-200 rounded-r-full -mr-4 -translate-x-3 hover:translate-x-0 shadow-none hover:shadow-md shadow-black/20 transition-all duration-200">
                                {category}
                            </li>
                        ))
                        }
                    </ul>
                </section>
                <section className="mb-6">
                    <h2 className="font-bold text-xl mx-4 mb-2">アーカイブ</h2>
                    <div className="mx-4 space-x-1 flex flex-col space-y-1">
                        <label className="inline-flex items-center px-2 py-1 rounded-md bg-gray-300/80 hover:bg-gray-300 cursor-pointer text-sm font-medium select-none transition-colors w-full">
                            <input
                                type="radio"
                                name="archive"
                                className="peer h-4 w-4 accent-gray-600 rounded border border-gray-500/60 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/60 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                            <span className="ml-2 text-gray-500 peer-checked:text-gray-900">全期間</span>
                        </label>
                        <label className="inline-flex items-center px-2 py-1 rounded-md bg-gray-300/80 hover:bg-gray-300 cursor-pointer text-sm font-medium select-none transition-colors w-full">
                            <input
                                type="radio"
                                name="archive"
                                className="peer h-4 w-4 accent-gray-600 rounded border border-gray-500/60 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/60 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                            <input type="number" min={2024} max={2025} defaultValue={today.getFullYear()} className="ml-2 w-20 p-0.5 rounded text-center border border-gray-200 peer-checked:border-gray-400 bg-gray-200 peer-checked:bg-gray-100" />
                            <span className="mx-2 text-gray-500 peer-checked:text-gray-900">年</span>
                            <input type="number" min={1} max={12} defaultValue={today.getMonth() + 1} className="w-10 p-0.5 rounded text-center border border-gray-200 peer-checked:border-gray-400 bg-gray-200 peer-checked:bg-gray-100" />
                            <span className="mx-2 text-gray-500 peer-checked:text-gray-900">月</span>
                        </label>
                    </div>
                </section>
                <section className="mb-6">
                    <h2 className="font-bold text-xl mx-4 mb-4">筆者</h2>
                    <ul className="pr-2 inline-flex flex-col space-y-1 ml-2">
                        {Object.values(Members).map((author, i) => (
                            <li key={i} className="flex items-center p-0.5 bg-gray-500 text-gray-200 rounded-full shadow-none hover:shadow-md shadow-black/20 transition-all duration-200">
                                <Image src={`/members/${author.id}.webp`} alt={`${author.id}'s icon`} width={16} height={16} className="h-8 w-8 rounded-full bg-white"/>
                                <span className="pl-2 pr-4">{author.data.name}</span>
                            </li>
                        ))
                        }
                    </ul>
                </section>
                <section>
                    <section>
                    </section>
                </section>
            </aside>
            <main className="ml-88 mt-20 pt-4">
                <div className="flex items-end ml-5">
                    <h1 className="font-extrabold text-3xl">ブログ</h1>
                    <span className={`ml-2 text-gray-400 ${jetBrainsMono.className}`}>?a=202508</span>
                </div>
            </main>
        </SharedBody>
    );
}