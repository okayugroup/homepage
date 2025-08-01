import {AdminBody} from "@/components/admin-body";
import {Header} from "@/components/Header";
import Link from "next/link";
import {BlogFindByDate} from "@/components/blog-finder";

export default function About() {
    return <AdminBody>
        <Header currentPath="/team/administrators/about" pane="admin" />
        <main className="mt-18 py-20 px-8 lg:px-60">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">おかゆグループ Administratorsについて</h1>
                <div>
                    <span className="text-gray-400">最終更新: </span>
                    <BlogFindByDate className="text-gray-600 dark:text-gray-300 hover:" date={new Date("2025-08-01")}/>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">概要</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                おかゆグループ Administratorsは、グループ全体の運営を行うチームです。私たちは、プロジェクトの管理やメンバーのサポートを通じて、グループの活動を円滑に進めることを目指しています。
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                私たちの役割は、以下の通りです。
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
                <li>プロジェクトの企画・運営</li>
                <li>サーバー・システムの管理</li>
                <li>グループ全体の方針の策定</li>
                <li>外部との連携・調整</li>
                <li>メンバーのサポート・育成</li>
                <li>お問い合わせの振り分け</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">私たちが管理するもの</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                おかゆグループ Administratorsは、以下のリソースを管理しています。
            </p>
            <ul className="list-disc space-y-4 list-inside text-gray-700 dark:text-gray-300 mb-6">
                <li>
                    <Link href="https://okayugroup.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                        おかゆグループ公式ウェブサイト
                    </Link>
                    <ul className="list-disc list-inside ml-4">
                        <li>
                            <Link href="https://okayugroup.com/team/administrators" className="text-blue-600 dark:text-blue-400 hover:underline">
                                おかゆグループ Administrators ホームページ
                            </Link>
                        </li>
                        <li>ドメイン</li>
                        <li>Cloudflareによるサーバー</li>
                        <li>Next.jsによるウェブサイト</li>
                    </ul>
                </li>
                <li>
                    <Link href="https://projects.okayugroup.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                        おかゆグループプロジェクト
                    </Link>
                    <ul className="list-disc list-inside ml-4">
                        <li>プロジェクトの管理</li>
                        <li>子プロジェクトの管理</li>
                        <li>プロジェクトのステータス管理</li>
                    </ul>
                </li>
                <li>おかゆグループ総合APIサーバー</li>
            </ul>
            <h2 className="text-2xl font-bold mb-2">お問い合わせについて</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
                私たちはグループ全体の運営を担当しており、またお問い合わせの振り分けも行っていますので、グループに関するお問い合わせはすべて受け付けております。
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                <span className="font-semibold">しかしながら</span>、私たちの負担を減らすためにも、具体的なプロジェクトやチームに関するお問い合わせは各プロジェクトの担当者やチームに直接お問い合わせいただくことをお勧めしております。
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                お問い合わせは、<Link href="https://okayugroup.com/contact" className="text-blue-600 dark:text-blue-400 hover:underline">こちら</Link>からお願いいたします。
            </p>

        </main>
    </AdminBody>
}