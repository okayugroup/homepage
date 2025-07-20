import Link from "next/link";
import Image from "next/image";

export function Header({ currentPath }: { currentPath: string }) {
    return (
        <header className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
            <Image src="/okayugroup.svg" alt="おかゆグループ" width={200} height={50} className="relative h-12" />
            <nav className="my-2">
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
