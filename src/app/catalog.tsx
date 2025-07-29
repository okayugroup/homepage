"use client";

import {useRef} from "react";

export default function ProjectCatalog({ children }: { children: React.ReactNode }) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 300; // スクロールするpx数（お好みで調整）
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return (
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
                className="flex overflow-x-auto gap-6 py-4 px-1 hidden-scrollbar"
                style={{ scrollSnapType: "x mandatory", maxWidth: 600 }}
            >
                {children}
            </div>
            <button
                onClick={() => scroll("right")}
                className="rounded-full bg-gray-200 dark:bg-gray-700 p-2 hover:bg-blue-400 transition"
                aria-label="右へ"
            >
                →
            </button>
        </div>
    );
}
