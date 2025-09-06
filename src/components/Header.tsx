"use client";

import Link from "next/link";
import Image from "next/image";
import {FaBars} from "react-icons/fa";
import {useState} from "react";
import {FaXmark} from "react-icons/fa6";

export function Header({ currentPath, pane }: { currentPath: string, pane?: string }) {
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    switch (pane) {
        default: {
            const urls = [
                {path: "/", label: "ホーム"},
                {path: "/about", label: "おかゆグループについて"},
                {path: "/contact", label: "お問い合わせ"},
                {path: "/blog", label: "ブログ"},
            ]
            return (
                <>
                    <header
                        className="flex items-center justify-between py-2 px-10 md:px-4 bg-gray-100/75 dark:bg-gray-800/60 fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-b-gray-200 dark:border-b-gray-700">
                        <Image src="/okayugroup.svg" alt="おかゆグループ" width={200} height={50}
                               className="relative h-12"/>
                        <nav className="my-2 hidden md:block">
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
                        {isPaneOpen ?
                            <FaXmark size={24} className="md:hidden text-gray-700 dark:text-gray-200"
                                     onClick={() => setIsPaneOpen(false)}/> :
                            <FaBars size={24} className="md:hidden text-gray-700 dark:text-gray-200"
                                    onClick={() => setIsPaneOpen(true)}/>
                        }
                    </header>
                    <div className={`${isPaneOpen ? "fixed" : "hidden"} inset-0 backdrop-blur-sm bg-black/40 z-30`}
                    onClick={() => setIsPaneOpen(false)}></div>
                    <div className={`fixed left-4 right-4 top-16 bg-white dark:bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 rounded-b-2xl ${isPaneOpen ? "translate-y-0" : "translate-y-[-140%]"}`}>
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">メニュー</h2>
                        </div>
                        <nav className="p-4">
                            <ul className="space-y-4">
                                {
                                    urls.map((url) => (
                                        <li key={url.path}>
                                            <Link href={url.path}
                                                  className={`block text-gray-800 dark:text-gray-200 ${currentPath === url.path ? "text-blue-500 font-bold" : ""}`}
                                                  onClick={() => setIsPaneOpen(false)}>
                                                {url.label}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                </>
            );
        }
        case "blog": {
            const urls = [
                {path: "/", label: "ブログ一覧"},
                {path: "/policy", label: "利用規約"},
            ]
            return (
                <>
                    <header
                        className="flex items-center justify-between p-2 bg-gray-100/75 dark:bg-gray-800/60 fixed top-0 left-0 right-0 z-80 backdrop-blur-sm border-b border-b-gray-200 dark:border-b-gray-700">
                        <div className="flex items-center">
                            <Image src="/okayugroup.svg" alt="おかゆグループ" width={200} height={50}
                                   className="relative h-12"/>
                            <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-gray-100">ブログ</h1>
                        </div>
                        <nav className="my-2 hidden md:flex divide-gray-700 divide-x-2">
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
                        {isPaneOpen ?
                            <FaXmark size={24} className="md:hidden text-gray-700 dark:text-gray-200"
                                     onClick={() => setIsPaneOpen(false)}/> :
                            <FaBars size={24} className="md:hidden text-gray-700 dark:text-gray-200"
                                    onClick={() => setIsPaneOpen(true)}/>
                        }
                    </header>
                    <div
                        className={`${isPaneOpen ? "fixed" : "hidden"} inset-0 backdrop-blur-sm bg-black/40 z-60`}
                        onClick={() => setIsPaneOpen(false)}
                    ></div>
                    <div
                        className={`fixed left-4 right-4 top-16 bg-white dark:bg-gray-800 shadow-lg z-60 transform transition-transform duration-300 rounded-b-2xl ${isPaneOpen ? "translate-y-0" : "translate-y-[-140%]"}`}>
                        <div
                            className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">メニュー</h2>
                        </div>
                        <nav className="p-4">
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/"
                                          className={`block text-gray-800 dark:text-gray-200 ${currentPath === "/" ? "text-blue-500 font-bold" : ""}`}
                                          onClick={() => setIsPaneOpen(false)}>
                                        ホーム
                                    </Link>
                                </li>
                                {
                                    urls.map((url) => (
                                        <li key={url.path}>
                                            <Link href={"/blog" + url.path}
                                                  className={`block text-gray-800 dark:text-gray-200 ${currentPath === ("/blog" + url.path) ? "text-blue-500 font-bold" : ""}`}
                                                  onClick={() => setIsPaneOpen(false)}>
                                                {url.label}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                </>
            )
        }
    }



}
