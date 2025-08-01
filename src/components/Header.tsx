import Link from "next/link";
import Image from "next/image";
import {IAdministrators} from "@/components/icons";

export function Header({ currentPath, pane }: { currentPath: string, pane?: "admin" }) {
    switch (pane) {
        case "admin":
            return (
                <header className="flex items-center justify-between p-2 px-5 lg:px-30 bg-background fixed top-0 left-0 right-0 z-50 border-b border-b-gray-200 dark:border-b-gray-700">
                    <Link href="/">
                        <div className="flex items-center space-x-2 relative group">
                            <span className="text-xs text-blue-500 underline object-cover absolute left-0 opacity-0 group-hover:opacity-100 duration-200">← おかゆグループ公式へ戻る</span>
                            <IAdministrators width={144} height={48} className="fill-foreground group-hover:opacity-20 transition-opacity duration-150 "/>
                        </div>
                    </Link>
                    <nav className="flex items-center justify-between">
                        <ul className="flex space-x-6">
                            <li>
                                <Link href="/team/administrators" className={currentPath === "/team/administrators" ? "border-b-2 border-offset-b-2 border-b-blue-500" : ""}>
                                    ホーム
                                </Link>
                            </li>
                            <li>
                                <Link href="/team/administrators/about" className={currentPath === "/team/administrators/about" ? "border-b-2 border-offset-b-2 border-b-blue-500" : ""}>
                                    役割
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            )
        default:
            const urls = [
                {path: "/", label: "ホーム"},
                {path: "/about", label: "おかゆグループについて"},
                {path: "/contact", label: "お問い合わせ"},
            ]
            return (
                <header className="flex items-center justify-between p-2 bg-gray-100/75 dark:bg-gray-800/60 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-b-gray-200 dark:border-b-gray-700">
                    <Image src="/okayugroup.svg" alt="おかゆグループ" width={200} height={50} className="relative h-12" />
                    <nav className="my-2">
                        <ul className="flex space-x-4">
                            {
                                urls.map((url) => (
                                    <li key={url.path}>
                                        <Link href={url.path} className={currentPath === url.path ? "text-blue-500 font-bold" : ""}>
                                            {url.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </header>
            );
    }



}
