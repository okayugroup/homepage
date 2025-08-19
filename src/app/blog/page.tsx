"use client";

import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import Link from "next/link";

export default function BlogPage() {
    const today = new Date();
    return (
        <SharedBody>
            <Header currentPath={"/blog/"} pane={"blog"}/>
            <aside className="fixed bg-gray-200 z-50 left-0 top-20 bottom-2 w-80 rounded-r-xl pr-4 py-6 overflow-y-auto">
                <section className="mb-4">
                    <h2 className="font-bold text-xl mx-4 mb-2">カテゴリ</h2>
                    <ul className="pr-2 flex flex-col space-y-1">
                        {["お知らせ", "イベント", "技術", "地域貢献"].map((category, i) => (
                            <Link key={i} href={`/blog/${category}`} className="p-0.5 pl-8 bg-gray-500 text-gray-200 rounded-r-full -mr-4 -translate-x-3 hover:translate-x-0 shadow-none hover:shadow-md shadow-black/20 transition-all duration-200">
                                <li>
                                    {category}
                                </li>
                            </Link>
                        ))
                        }
                    </ul>
                </section>
                <section>
                    <h2 className="font-bold text-xl mx-4 mb-2">アーカイブ</h2>
                    <div className="mx-4 space-x-1">
                        <input type="number" min={2024} max={2025} defaultValue={today.getFullYear()} className="w-20 bg-gray-100 p-0.5 rounded text-center border border-gray-400" />
                        <span className="mr-2">年</span>
                        <input type="number" min={1} max={12} defaultValue={today.getMonth() + 1} className="w-10 bg-gray-100 p-0.5 rounded text-center border border-gray-400" />
                        <span>月</span>
                    </div>

                </section>
            </aside>
            <main>
            </main>
        </SharedBody>
    );
}