"use client";

import {useRef} from "react";

export default function ProjectCatalog() {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 300; // スクロールするpx数（お好みで調整）
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    // ダミーデータ
    const projects = [
        { title: "OGSP", desc: "おかゆグループによる災害対策プロジェクト", status: 1 },
        { title: "OGSP Seismometer", desc: "おかゆグループ開発の地震計", status: 1 },
        { title: "OGSP Server Node", desc: "ネットワークノード", status: 1 },
        { title: "OGSP Network", desc: "災害情報共有・データ配信ネットワーク", status: 1 },
        { title: "OGSP Disaster Prevention", desc: "OGSPのPC向けクライアント", status: 1 },
    ];

    const statuses = [
        <span key="0" className="text-yellow-200">予定</span>,
        <span key="1" className="text-green-200">進行中</span>,
        <span key="2" className="text-blue-200">完了</span>,
        <span key="3" className="text-red-200">中止</span>,
    ]

    return (
        <section className="py-16 px-8 sm:px-20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                    プロジェクト
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    おかゆグループでは、様々なプロジェクトを通じて地域社会に貢献しています。
                    ここでは、現在進行中のプロジェクトの一部を紹介します。
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => scroll("left")}
                        className="rounded-full bg-gray-200 dark:bg-gray-700 p-2 hover:bg-blue-400 transition"
                        aria-label="左へ"
                    >
                        ←
                    </button>
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 py-4 px-1 scrollbar-hide"
                        style={{ scrollSnapType: "x mandatory", maxWidth: 600 }}
                    >
                        {projects.map((p, i) => (
                            <div
                                key={i}
                                className="min-w-[220px] snap-center bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-shrink-0"
                            >
                                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{p.desc}</p>
                                <div className="mt-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        ステータス: {statuses[p.status]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => scroll("right")}
                        className="rounded-full bg-gray-200 dark:bg-gray-700 p-2 hover:bg-blue-400 transition"
                        aria-label="右へ"
                    >
                        →
                    </button>
                </div>
            </div>
            {/* スクロールバー非表示用カスタムCSS（下記参照） */}
        </section>
    );
}
