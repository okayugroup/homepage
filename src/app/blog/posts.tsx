"use client"

import {Blog} from "@/db/blog";
import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import {Members} from "@/db/members";
import Image from "next/image";
import {Teams} from "@/db/teams";
import {TeamIcon} from "@/components/team-icon";
import Link from "next/link";
import {useSearchParams} from "next/navigation";


const searchQuery = {
    time: "all" as ("all" | { year: number, month: number }),
    categories: [] as string[],
    teams: [] as string[],
    word: "" as string,
    sort: "new" as const, // "new" or "old"
    author: [] as string[],
    limit: 10 as number,
    page: 1 as number,
}


function searchQueryToString(query: typeof searchQuery): string {
    const params = new Map<string, string>();
    if (query.time !== "all") {
        params.set("m", `${query.time.year}${String(query.time.month).padStart(2, '0')}`);
    }
    if (query.categories.length > 0) {
        params.set("cat", query.categories.join(","));
    }
    if (query.teams.length > 0) {
        params.set("team", query.teams.join(","));
    }
    if (query.word) {
        params.set("word", query.word);
    }
    if (query.author.length > 0) {
        params.set("author", query.author.join(","));
    }
    return Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&");
}


export default function Posts({ blogs }: { blogs: Blog[] }) {
    const today = new Date();

    const searchParams = useSearchParams();
    const searchParamsM = searchParams.get("m");
    searchQuery.time = searchParamsM ? {year: Number(searchParamsM.slice(0, 4)), month: Number(searchParamsM.slice(4, 6))} : "all";  // 202501の形式
    const searchParamsCat = searchParams.get("cat");
    searchQuery.categories = searchParamsCat ? searchParamsCat.split(",") : [];
    const searchParamsGroups = searchParams.get("groups");
    searchQuery.teams = searchParamsGroups ? searchParamsGroups.split(",") : [];

    const queryUrlText = searchQueryToString(searchQuery);

    const blogsSearched = blogs.filter(blog => {
        if (searchQuery.time !== "all") {
            const blogDate = new Date(blog.createdAt ?? blog.updatedAt ?? "");
            if (isNaN(blogDate.getTime())) return false;
            if (blogDate.getFullYear() !== searchQuery.time.year || (blogDate.getMonth() + 1) !== searchQuery.time.month) {
                return false;
            }
        }
        if (searchQuery.categories.length > 0) {
            if (!blog.categories || !blog.categories.some(cat => searchQuery.categories.includes(cat))) {
                return false;
            }
        }
        if (searchQuery.teams.length > 0) {
            // if (!blog.teams || !blog.teams.some(group => searchQuery.teams.includes(group))) {
            //     return false;
            // }
        }
        if (searchQuery.author.length > 0) {
            if (!blog.author || !searchQuery.author.includes(blog.author)) {
                return false;
            }
        }
        if (searchQuery.word) {
            const lowerSearch = searchQuery.word.toLowerCase();
            if (!(blog.title.toLowerCase().includes(lowerSearch) || (blog.description && blog.description.toLowerCase().includes(lowerSearch)))) {
                return false;
            }
        }
        return true;
    })

    return (
        <SharedBody>
            <Header currentPath={"/blog/"} pane="blog"/>
            <aside className="fixed bg-gray-200 dark:bg-gray-800 z-50 left-0 top-20 bottom-2 w-80 rounded-r-xl pr-2 py-6 overflow-y-auto">
                <section className="mb-6">
                    <h2 className="font-bold text-xl mx-4 mb-4">カテゴリ</h2>
                    <ul className="pr-2 flex flex-col space-y-1">
                        {["お知らせ", "イベント", "技術", "地域貢献"].map((category, i) => (
                            <li key={i} className="p-0.5 pl-8 bg-gray-500 dark:bg-gray-700 text-gray-200 rounded-r-full -mr-4 -translate-x-3 hover:translate-x-0 shadow-none hover:shadow-md shadow-black/20 transition-all duration-200">
                                {category}
                            </li>
                        ))
                        }
                    </ul>
                </section>
                <section className="mb-6">
                    <h2 className="font-bold text-xl mx-4 mb-2">アーカイブ</h2>
                    <div className="ml-2 space-x-1 flex flex-col space-y-1">
                        <label className="inline-flex items-center px-2 py-1 rounded-md bg-gray-300/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer text-sm font-medium select-none transition-colors w-full">
                            <input
                                defaultChecked
                                type="radio"
                                name="archive"
                                className="peer h-4 w-4 accent-gray-600 rounded border border-gray-500/60 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/60 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                            <span className="ml-2 text-gray-500 peer-checked:text-gray-900 dark:text-gray-400 dark:peer-checked:text-gray-200">全期間</span>
                        </label>
                        <label className="inline-flex items-center px-2 py-1 rounded-md bg-gray-300/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer text-sm font-medium select-none transition-colors w-full">
                            <input
                                type="radio"
                                name="archive"
                                className="peer h-4 w-4 accent-gray-600 rounded border border-gray-500/60 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/60 focus:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed"
                            />
                            <input type="number" min={2024} max={2025} defaultValue={today.getFullYear()} className="ml-2 w-20 p-0.5 rounded text-center border border-gray-200 peer-checked:border-gray-400 dark:border-gray-600 dark:peer-checked:border-gray-500 bg-gray-200 peer-checked:bg-gray-100 dark:bg-gray-700 dark:peer-checked:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-gray-200" />
                            <span className="mx-2 text-gray-500 peer-checked:text-gray-900 dark:text-gray-400 dark:peer-checked:text-gray-200">年</span>
                            <input type="number" min={1} max={12} defaultValue={today.getMonth() + 1} className="w-10 p-0.5 rounded text-center border border-gray-200 peer-checked:border-gray-400 dark:border-gray-600 dark:peer-checked:border-gray-500 bg-gray-200 peer-checked:bg-gray-100 dark:bg-gray-700 dark:peer-checked:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-gray-200" />
                            <span className="mx-2 text-gray-500 peer-checked:text-gray-900 dark:text-gray-400 dark:peer-checked:text-gray-200">月</span>
                        </label>
                    </div>
                </section>
                <section className="mb-6">
                    <h2 className="font-bold text-xl mx-4 mb-4">筆者</h2>
                    <ul className="pr-2 inline-flex flex-col space-y-1 ml-2">
                        {Object.values(Members).map((author, i) => (
                            <li key={i} className="flex items-center p-0.5 bg-gray-500 dark:bg-gray-700 text-gray-200 rounded-full shadow-none hover:shadow-md shadow-black/20 transition-shadow duration-200">
                                <Image src={`/members/${author.id}.webp`} alt={`${author.id}'s icon`} width={16} height={16} className="h-8 w-8 rounded-full bg-white"/>
                                <span className="pl-2 pr-4">{author.data.name}</span>
                            </li>
                        ))
                        }
                    </ul>
                </section>
                <section>
                    <h2 className="font-bold text-xl mx-4 mb-4">チーム</h2>
                    <ul className="pr-2 flex flex-col space-y-1 ml-2">
                        {Object.values(Teams).map((team, i) => (
                            <li key={i} className="bg-gray-500 dark:bg-gray-700 text-gray-200 rounded-xl shadow-none hover:shadow-md shadow-black/20 transition-shadow duration-200 w-full overflow-hidden">
                                <TeamIcon id={team.id} className="bg-white"/>
                                <h3 className="px-2 py-1">{team.data.name}</h3>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <section>
                    </section>
                </section>
            </aside>
            <main className="ml-84 mt-20 pt-4 mr-8">
                <div className="ml-5">
                    <div className="flex items-end mb-2">
                        <h1 className="font-extrabold text-3xl">ブログ</h1>
                        {queryUrlText ?
                            <span className="ml-2 text-gray-400 font-mono">
                            {`?${queryUrlText}`}
                        </span>
                            : <></>
                        }
                    </div>
                    {
                        (()=>{
                            return <p className="text-gray-700 dark:text-gray-400">{blogsSearched.length > searchQuery.limit ?
                                `${blogsSearched.length}件のうち${searchQuery.limit}件 (${searchQuery.page}/${blogsSearched.length / searchQuery.limit}ページ)`
                            : `${blogsSearched.length}件のうちすべて (1/1ページ)`}</p>
                        })()
                    }
                    <section className="mt-4">
                        {
                            blogsSearched.map((item, i) => {
                                const date = item.createdAt ?? item.updatedAt;
                                return <article key={i} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-none">
                                    <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">{item.description || "No description available."}</p>
                                    <div className="flex items-center space-x-2 mb-2">
                                        { item.author && Members[item.author] ? <Link href={`/member/${item.author}`} className="inline-flex items-center space-x-2 p-1 rounded-md transition-colors hover:bg-gray-400/20 dark:hover:bg-white/20">
                                            <Image src={`/members/${item.author}.webp`} alt={`${item.author}'s icon`} width={24} height={24} className="h-6 w-6 rounded-full bg-white"/>
                                            <span className="text-sm text-gray-500 dark:text-gray-300">{Members[item.author]?.data.name || item.author}</span>
                                        </Link> : <span>匿名/未指定</span>
                                        }
                                        { date ? <span className="text-xs text-gray-400 dark:text-gray-500">・{new Date(date).toLocaleDateString()}</span> : <span className="text-xs text-gray-400 dark:text-gray-500">・日付不明</span> }
                                    </div>
                                    <a href={`/blog/${item.slug}`} className="text-blue-600 hover:underline">続きを読む</a>
                                </article>;
                            })
                        }
                    </section>

                </div>

            </main>
        </SharedBody>
    );
}