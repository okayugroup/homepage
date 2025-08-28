import NotFound from "next/dist/client/components/builtin/not-found";
import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import {Members} from "@/db/members";
import "./introduction.css"
import {getAllBlogs} from "@/db/blog";
import Image from "next/image";
import {LiaBirthdayCakeSolid} from "react-icons/lia";
import Link from "next/link";
import {FaGithub} from "react-icons/fa";
import {FaBluesky, FaKeybase, FaMarkdown, FaMastodon, FaXTwitter} from "react-icons/fa6";
import {SiMisskey, SiQiita} from "react-icons/si";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Skills} from "@/components/skills";
import {Lang} from "@/components/lang";

export async function generateStaticParams() {
    return Object.keys(Members).map(memberName => {
        return ({ memberName })
    });
}

type Props = {
    params: Promise<{ memberName: string }>;
};

export default async function TeamPage({ params }: Props) {
    const { memberName } = await params;
    const member = Members[memberName];

    // ここでチームごとのページ内容を生成！
    if (!member) {
        return NotFound();
    }

    const properties: string[] = [member.id];
    switch (member.data.additionalTags?.sex) {
        case "male":
            properties.push("男");
            break;
        case "female":
            properties.push("女");
            break;
        case "other":
            properties.push("その他");
            break;
    }
    const innerProperty = properties.join(" · ");

    const blogs = (await getAllBlogs()).filter(blog => blog.author === member.id);
    return <SharedBody>
        <Header currentPath={`/member/${memberName}`} />
        <main className="mt-24 m-10">
            <div className="flex flex-row gap-6">
                <div className="p-1 ml-20">
                    <Image alt={`${member.data.name}のアイコン`} src={`/members/${member.id}.webp`} width={256} height={256} className="rounded-full mb-4 border border-gray-300 dark:border-gray-600"/>
                    <section>
                        <h2 className="text-2xl font-bold mb-1">{member.data.name}</h2>
                        <div className="text-sm mb-3 text-gray-700 dark:text-gray-400">
                            <p>
                                {(()=> {
                                    if (member.data.additionalTags?.birthday) {
                                        const birthElapsed = Date.now() - member.data.additionalTags?.birthday.getTime();
                                        const ageYear = Math.floor(birthElapsed / (1000 * 60 * 60 * 24 * 365.25))
                                        return <>
                                            <span>{innerProperty + " · "}</span>
                                            <span className="relative group">
                                                {ageYear}歳
                                                <span className="absolute opacity-0 group-hover:opacity-100 left-0 top-5 transition-opacity duration-150 text-xs flex items-center">
                                                    <LiaBirthdayCakeSolid size={14}/><span className="ml-1">{member.data.additionalTags.birthday.toLocaleDateString("ja-JP")}</span>
                                                </span>
                                            </span>
                                        </>

                                    }
                                    return innerProperty;
                                })()}
                            </p>
                        </div>
                        <p className="mb-4">{member.data.description}</p>
                        <div className="flex gap-2 flex-wrap dark:text-gray-200 text-gray-800">
                            {Object.entries(member.data.links).map(([key, value], i) => (
                                <Link href={value} key={i}>
                                    {(() => {
                                        switch (key.toLowerCase()) {
                                            case "github":
                                                return <FaGithub size={20}/>;
                                            case "twitter":
                                            case "x":
                                                return <FaXTwitter size={20}/>;
                                            case "misskey":
                                                return <SiMisskey size={20}/>;
                                            case "mastodon":
                                                return <FaMastodon size={20}/>;
                                            case "bluesky":
                                                return <FaBluesky size={20}/>;
                                            case "qiita":
                                                return <SiQiita size={20}/>;
                                            case "keybase":
                                                return <FaKeybase size={20}/>;
                                            default:
                                                return <span className="text-gray-800 hover:underline">{key}</span>;
                                        }
                                    })()}
                                </Link>)
                            )}
                        </div>
                    </section>

                </div>
                <div className="flex-1 mr-40">
                    <section className="px-6 py-4 rounded-lg border border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between">
                            <p className={`font-mono text-xs`}>about-me<span className="text-gray-500 dark:text-gray-400">.md</span></p>
                            <FaMarkdown size={16} className="text-gray-500" />
                        </div>
                        <div className="markdown-body">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {member.data.aboutMe}
                            </ReactMarkdown>
                        </div>
                    </section>
                    <div className="mt-8 px-6 space-y-10 mb-12">
                        {(member.data.languages || member.data.skills) ? <section className="max-w-full">
                            <h2 className="text-2xl font-bold">開発</h2>
                            <div className="flex flex-nowrap w-full h-120">
                                {member.data.skills ? <div className={"flex-2/3"}><Skills skills={member.data.skills!}/></div> : <></>}
                                {member.data.languages ? <div className={"flex-1/3"}><Lang languages={member.data.languages!}/></div> : <></>}
                            </div>
                        </section> : <></>}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">ブログ</h2>
                            <div className="text-gray-700 dark:text-gray-300 divide-y divide-gray-400">
                                {blogs.length > 0 ? blogs.map((blog, i) => (
                                    <article key={i} className="px-1 py-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-xl font-semibold mb-1">
                                                <Link href={`/blog/${blog.slug}`} className="hover:underline">
                                                    {blog.title}
                                                </Link>
                                            </h3>
                                            { blog.createdAt || blog.updatedAt ?
                                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                                    {new Date(blog.createdAt ?? blog.updatedAt!).toLocaleDateString()}
                                                </span> :
                                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                                    日付不明
                                                </span>
                                            }
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-2">{blog.description || "No description available."}</p>
                                    </article>
                                )) : <p className="text-sm">このメンバーのブログはまだありません。</p>}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>

    </SharedBody>
}