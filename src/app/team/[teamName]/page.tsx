import NotFound from "next/dist/client/components/builtin/not-found";
import {Teams} from "@/db/teams";
import {Header} from "@/components/Header";
import Link from "next/link";
import {FaArrowRight, FaRegClock} from "react-icons/fa6";
import {BlogFindByDate} from "@/components/blog-finder";
import {TeamIcon} from "@/components/team-icon";
import {getAllBlogs} from "@/db/blog";
import {Footer} from "@/components/Footer";
import {SharedBody} from "@/components/shared-body";

export async function generateStaticParams() {
    const a = Object.keys(Teams);
    a.push("preparing");
    return a.map(teamName => {
        return ({ teamName })
    });
}

type Props = {
    params: Promise<{ teamName: string }>;
};

export default async function TeamPage({ params }: Props) {
    const { teamName } = await params;
    let team;
    switch (teamName) {
        case "preparing":
            return <div className="text-center mt-20">
                <h1 className="text-2xl font-bold">準備中のチームです</h1>
                <p className="text-gray-500">このチームはまだ準備中です。詳細は後日公開されます。</p>
            </div>;
        default:
            team = Teams[teamName];
    }

    if (team == null) return NotFound();

    const blogs = await getAllBlogs();
    const teamBlogs = blogs.filter(blog => blog.team === team.id);
    const announcements = teamBlogs.filter(blog => {
        const date = blog.createdAt ?? blog.updatedAt;
        return blog.categories?.includes("お知らせ") && (date != undefined && date.getTime() >= new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
    }).slice(0, 5);
    const regularBlogs = teamBlogs.filter(blog => !blog.categories?.includes("お知らせ"));
    return (
        <SharedBody type="admin">
            <Header currentPath={`/team/${team.id}`} />
            <div className="flex my-18 pl-5 xl:pl-20 gap-10">
                <main className="flex-3/4">
                    <div className="mt-10 py-5 mx-4 mb-4">
                        <div className="flex items-end mb-2">
                            <h1 className="text-3xl font-extrabold">{team.data.name}</h1>
                            <Link href="/team/" title="ほかのチームを見る" className="hover:underline">
                                <small className="px-2 text-lg font-bold">チーム</small>
                            </Link>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{team.data.description}</p>
                        <div className="flex items-center gap-2">
                            <FaRegClock size={14} className="h-full fill-gray-600 dark:text-gray-300" />
                            <p className="text-sm">
                                <span className="text-gray-400">最終更新: </span>
                                <BlogFindByDate className="text-gray-600 dark:text-gray-300" date={team.lastUpdated}/>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-6 mb-30">
                        <section className="flex-1 space-y-6">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                                <TeamIcon id={team.id} className="fill-foreground"/>
                            </div>
                            <section>
                                <h2 className="text-2xl font-bold">概要</h2>
                                <div className="space-y-4 text-gray-700 dark:text-gray-300 mt-2">
                                    {team.data.summary}
                                </div>
                            </section>
                        </section>
                        <div className="border-l-2 -my-4 border-l-gray-400 dark:border-gray-600"/>
                        <section className="w-60 space-y-4">
                            <section>
                                <h2 className="font-bold text-lg mb-2">設立</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        {
                                            (() => {
                                                if (!team.data.history) {
                                                    return <li className="font-semibold">
                                                        {team.data.founded.toLocaleDateString()} - 設立
                                                    </li>;
                                                } else {
                                                    return <>{team.data.history.filter(h => h.date < team.data.founded).map((h, i) =>
                                                        <li key={i}>
                                                            {h.date.toLocaleDateString()} - {h.description}
                                                        </li>
                                                    )}
                                                        <li className="font-semibold">
                                                            {team.data.founded.toLocaleDateString()} - 設立
                                                        </li>
                                                        {team.data.history.filter(h => h.date >= team.data.founded).map((h, i) =>
                                                            <li key={i}>
                                                                {h.date.toLocaleDateString()} - {h.description}
                                                            </li>
                                                        )}
                                                    </>
                                                }
                                            })()
                                        }
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">役割</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        {team.data.roles.map((role, i) => <li key={i}>{role}</li>)}
                                    </ul>
                                    <p>など</p>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">メンバー</h2>
                                <div className="mx-1">
                                    <ul className="list-disc list-inside">
                                        <li><Link href={`/member/${team.data.members[0]}`} className="hover:underline"><span className="font-semibold">{team.data.members[0]}</span> - 代表</Link></li>
                                        {team.data.members.slice(1).map((member, i) => <li key={i}><Link href={`/member/${team.data.members[0]}`} className="hover:underline">{member}</Link></li>)}
                                    </ul>
                                </div>
                            </section>
                            <section>
                                <h2 className="font-bold text-lg mb-2">リンク</h2>
                                <nav className="mx-1 list-none">
                                    {team.data.links.map(({url, label}, i) =>
                                        <li key={i}>
                                            <Link href={url} className="group inline-flex">
                                                <FaArrowRight size={14} className="h-auto mr-2 transition-transform group-hover:translate-x-1"/>
                                                <span className=" text-blue-600 dark:text-blue-400 group-hover:underline">
                                                    {label}
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </nav>
                            </section>
                        </section>
                    </div>
                    <div className="space-y-20">
                        <section>
                            <h2 className="text-3xl font-bold">お知らせ</h2>

                            <ul className="list-inside gap-6 mt-8 ml-4 space-y-2">
                                { announcements.length > 0 ? announcements.map((blog, i) => (
                                    <li key={i}>
                                        <Link href={`/blog/${blog.slug}`} className="hover:underline">
                                            {blog.title}
                                        </Link>
                                        { blog.createdAt ? <span
                                            className="text-sm text-gray-500">（{(blog.createdAt).toLocaleDateString()}）</span> : null}
                                    </li>
                                )) : <span className="text-gray-500">直近30日間で発表されたお知らせはありません。</span>}
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-3xl font-bold">ブログ</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                                { regularBlogs.length > 0 ? regularBlogs.map((blog, i) => (
                                    <div key={i} className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
                                        <Link href={`/blog/${blog.slug}`} className="font-semibold text-lg hover:underline">
                                            {blog.title}
                                        </Link>
                                        { blog.createdAt ? <p className="text-sm text-gray-500 mt-1">{(blog.createdAt).toLocaleDateString()}</p> : null}
                                    </div>
                                )) : <div className="text-gray-500"><span>ここには（まだ）何もありません。</span></div>}
                            </div>
                        </section>
                        { team.data.addition }
                    </div>
                </main>
                <aside className="mt-20 rounded-l-2xl bg-gray-50 dark:bg-gray-800 flex-1/4 p-8">
                    <h2 className="text-xl font-semibold">ここにはたぶんプロジェクトとかを書くことになると思う</h2>
                </aside>
            </div>
            <Footer/>
        </SharedBody>
    )
}