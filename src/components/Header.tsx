import Link from "next/link";
import Image from "next/image";

export function Header({ currentPath, pane }: { currentPath: string, pane?: string }) {
    switch (pane) {
        default: {
            const urls = [
                {path: "/", label: "ホーム"},
                {path: "/about", label: "おかゆグループについて"},
                {path: "/contact", label: "お問い合わせ"},
                {path: "/blog", label: "ブログ"},
            ]
            return (
                <header
                    className="flex items-center justify-between p-2 bg-gray-100/75 dark:bg-gray-800/60 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-b-gray-200 dark:border-b-gray-700">
                    <Image src="/okayugroup.svg" alt="おかゆグループ" width={200} height={50}
                           className="relative h-12"/>
                    <nav className="my-2">
                        <ul className="flex space-x-4 px-3">
                            {
                                urls.map((url) => (
                                    <li key={url.path}>
                                        <Link href={url.path}
                                              className={currentPath === url.path ? "text-blue-500 font-bold" : ""}>
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
        case "blog": {
            const urls = [
                {path: "/", label: "ブログ一覧"},
            ]
            return (
                <header
                    className="flex items-center justify-between p-2 bg-gray-100/75 dark:bg-gray-800/60 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-b-gray-200 dark:border-b-gray-700">
                    <div className="flex items-center">
                        <Image src="/okayugroup.svg" alt="おかゆグループ" width={200} height={50}
                               className="relative h-12"/>
                        <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-gray-100">ブログ</h1>
                    </div>
                    <nav className="my-2 flex divide-gray-700 divide-x-2">
                        <ul className="flex space-x-4 px-3 pr-5">
                            <li><Link href="/">ホーム</Link></li>
                        </ul>
                        <ul className="flex space-x-4 px-3 pl-5">
                            {
                                urls.map((url) => (
                                    <li key={url.path}>
                                        <Link href={"/blog" + url.path}
                                              className={currentPath === ("/blog" + url.path) ? "text-blue-500 font-bold" : ""}>
                                            {url.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </header>
            )
        }
    }



}
