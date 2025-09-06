import {JSX} from "react";
import Link from "next/link";

export function Footer(): JSX.Element {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-4 py-8 px-10 lg:px-20 border-t border-gray-300 dark:border-gray-700">
            <p className="text-sm text-center">
                &copy; 2024-{new Date().getFullYear()} おかゆグループ. All rights reserved.
            </p>
            <div className="mt-8">
                <h2 className="mb-2 font-bold">Links</h2>
                <nav className="grid space-x-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <ul className="space-y-1 text-sm">
                        <li><Link href="/about" className="hover:underline">私たちについて</Link></li>
                        <li><Link href="/team" className="hover:underline">チーム</Link></li>
                        <li><Link href="/member" className="hover:underline">メンバー</Link></li>
                        <li><Link href="/blog" className="hover:underline">ブログ</Link></li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="/contact" className="hover:underline">お問い合わせ</Link></li>
                        <li><Link href="/privacy" className="hover:underline">プライバシーポリシー</Link></li>
                        <li><Link href="/terms" className="hover:underline">利用規約</Link></li>
                        <li><Link href="/cookies" className="hover:underline">クッキーポリシー</Link></li>
                    </ul>
                    <ul className="space-y-1 text-sm">
                        <li><a href="https://project.okayugroup.com" className="hover:underline" target="_blank" rel="noopener noreferrer">プロジェクト一覧</a></li>
                        <li><a href="https://github.com/okayugroup" className="hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="https://okayugroup.net" className="hover:underline" target="_blank" rel="noopener noreferrer">Misskey</a></li>
                    </ul>
                </nav>
            </div>

        </footer>
    );
}