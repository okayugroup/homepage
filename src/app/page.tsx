import Image from "next/image";
import { Header } from "@/components/Header";
import {FaGithub} from "react-icons/fa";
import Link from "next/link";
import ProjectCatalog from "@/app/catalog";
import {SiMisskey} from "react-icons/si";
import {DefaultBody} from "@/components/default-body";
import {getProjectAll, projects, ProjectStatus} from "@/db/projects";

export default function Home() {
  return (
    <DefaultBody>
      <Header currentPath="/" />
      <main>
        <section className="flex flex-col relative">
        <Image className="w-screen h-screen object-cover" src="/shiga.webp" alt="滋賀県の航空写真" width="2597" height="1841"/>
        <div className="absolute inset-0 text-white flex flex-col items-center justify-end sm:justify-center sm:items-start">
          <div className="text-shadow-lg/80 pt-3 pb-10 sm:p-6 sm:rounded-r-2xl space-y-4">
            <h1 className="text-4xl font-black text-center sm:text-left mt-4">
              おかゆグループ
            </h1>
            <p className="text-lg text-center sm:text-left mt-2">
              おかゆグループは、滋賀県を拠点とする学生団体です。
            </p>
            <p className="text-lg text-center sm:text-left mt-2">
              私たちは、ソフトウェア開発をはじめとした社会貢献活動を行っています。
            </p>
            <div className="flex flex-row mt-6 mx-8 sm:mx-0 gap-4 justify-evenly sm:justify-start">
              <Link href="https://github.com/okayugroup" target="_blank">
                <FaGithub size={32} color="white" />
              </Link>
              <Link href="https://okayugroup.net" target="_blank">
                <SiMisskey size={32} color="white" />
              </Link>
            </div>
          </div>
        </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-8 sm:px-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              私たちについて
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  ミッション
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  おかゆグループは、技術を通じて地域社会に貢献することを目指しています。
                  学生の視点から、ソフトウェア開発や社会問題の解決に取り組みます。
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  活動拠点
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  滋賀県を中心に活動しており、地域密着型のプロジェクトから、日本全国、さらには国際的な活動まで幅広く展開しています。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <div className="bg-gray-50 dark:bg-gray-800">
          <section className="py-16 px-8 sm:px-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
                主な活動
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    ソフトウェア開発
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Webアプリケーション、モバイルアプリ、システム開発など、
                    様々な技術を使ったプロジェクトに取り組んでいます。
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    社会貢献活動
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    地域のイベントへの参加、ボランティア活動、
                    技術教育など、社会に貢献する活動を行っています。
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    勉強会・交流
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    定期的な勉強会や技術交流を通じて、
                    メンバー同士のスキルアップと知識共有を図っています。
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 px-8 sm:px-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                プロジェクト
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                おかゆグループでは、様々なプロジェクトを通じて地域社会に貢献しています。
                ここでは、現在進行中のプロジェクトの一部を紹介します。
              </p>
              <ProjectCatalog>
                {
                  (() => {
                    const statuses = [
                      <span key="0" className="text-yellow-500 dark:text-yellow-200">予定</span>,
                      <span key="1" className="text-green-500 dark:text-green-200">進行中</span>,
                      <span key="2" className="text-blue-500 dark:text-blue-200">完了</span>,
                      <span key="3" className="text-red-500 dark:text-red-200">中止</span>,
                    ];

                    return getProjectAll().filter((p, _n, _a) => p.status == ProjectStatus.InProgress).map((p, i) => (
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
                    ))
                  })()
                }
              </ProjectCatalog>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <section className="py-16 px-8 sm:px-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
              お問い合わせ
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              おかゆグループの活動に興味がある方、一緒に活動したい方は、
              お気軽にお問い合わせください。
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
              なお、おかゆグループのプロジェクト等でご不明な点がある場合については
              <Link href="/question" className="text-blue-500 hover:underline">
                ご質問・お問い合わせフォーム
              </Link>
              からご連絡ください。
            </p>
            <div className="flex justify-center gap-6">
              <Link
                href="https://github.com/okayugroup"
                className="flex items-center gap-2 bg-gray-800 dark:bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors"
              >
                <FaGithub size={20} />
                GitHub
              </Link>
              <Link
                  href="https://okayugroup.net"
                  className="flex items-center gap-2 bg-gray-800 dark:bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors"
              >
                <SiMisskey size={20} />
                Misskey
              </Link>
            </div>
          </div>
        </section>
      </main>
    </DefaultBody>
  );
}
