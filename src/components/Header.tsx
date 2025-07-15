import Link from "next/link";

export function Header({ currentPath }: { currentPath: string }) {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
            <h1 className="text-xl font-bold">おかゆグループ</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className={currentPath === "/" ? "text-blue-500 font-bold" : ""}>ホーム</Link>
                    </li>
                    <li>
                        <Link href="/about" className={currentPath === "/about" ? "text-blue-500 font-bold" : ""}>おかゆグループについて</Link>
                    </li>
                    <li>
                        <Link href="/contact" className={currentPath === "/contact" ? "text-blue-500 font-bold" : ""}>お問い合わせ</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
