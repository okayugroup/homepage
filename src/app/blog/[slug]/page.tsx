import {SharedBody} from "@/components/shared-body";
import {getAllBlogs, getBlogContent} from "@/db/blog";
import {Header} from "@/components/Header";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import {unified} from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "./blog.css"
import {Root} from "mdast";
import {FaSearch, FaTag} from "react-icons/fa";
import Link from "next/link";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import {FaRegFolder} from "react-icons/fa6";
import {format} from "date-fns";

export async function generateStaticParams() {
    return (await getAllBlogs()).map(blog => {
        return ({ slug: blog.slug })
    });
}


type Heading = { depth: 1|2|3|4|5|6, text: string, slug: string };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const [blog, content] = await getBlogContent(slug);
        const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, { allowDangerousHtml: true }) // raw を使う場合は allowDangerousHtml
            .use(rehypeRaw) // 生HTMLを許可する場合のみ
            .use(rehypeSlug) // 見出しにidを自動付与
            .use(rehypeHighlight) // シンタックスハイライト
            .use(rehypeStringify)
            .process(content);

        const tree = unified()
            .use(remarkParse)
            .parse(content) as Root;
        const slugger = new GithubSlugger();
        const headings: Heading[] = (tree.children
            .filter(node => node.type === 'heading' && (node.depth === 2 || node.depth === 3))
            .map(node => {
                if (node.type === 'heading') {
                    const text = node.children.map(child => {
                        if (child.type === 'text') {
                            return child.value;
                        } else if (child.type === 'link' && child.children) {
                            return child.children.map(c => c.type === 'text' ? c.value : '').join('');
                        }
                        return '';
                    }).join('');
                    const slug = slugger.slug(text);
                    return { depth: node.depth, text, slug } as Heading;
                }
                return null;
            })
            .filter((h): h is Heading => h !== null));

        const html = String(file);
        const latestBlogs = (await getAllBlogs()).slice(0, 5);
        const time = blog.createdAt ?? blog.updatedAt;
        return <SharedBody>
            <Header currentPath={'/blog/' + slug} pane="blog"/>
            <div className="pl-4 lg:pl-20 xl:pl-40 pr-4 lg:pr-88 xl:pr-94">
                <main className="mt-24 pb-14">
                    <div>
                        <h1 className="text-3xl font-bold">{blog.title}</h1>
                        <div className="text-gray-500 mt-2 flex flex-row flex-wrap list-disc space-x-2 space-y-1">
                            {time?
                                <span>
                                    <Link className="group" href={`/blog?m=${format(time, "yyyyMM")}`}>
                                        <span className="group-hover:underline">{format(time, "y/M")}</span>
                                        /{time.getDate()}
                                    </Link>

                                </span>
                                : <span>投稿時間不明</span>}
                            {blog.author ? <Link href={`/member/${blog.author}`} className="group">投稿者: <span className="group-hover:underline">{blog.author}</span></Link> : <span>匿名</span>}
                        </div>
                        <ul className="flex flex-wrap gap-2 mt-1">
                            { blog.categories?.map((category, index) => (
                                <li key={index} className="text-sm bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-2.5 py-1">
                                    <Link href={`/blog?cat=${category}`} className="inline-flex items-center hover:underline">
                                        <FaRegFolder size={14} className="mr-1"/>
                                        {category}
                                    </Link>
                                </li>
                            ))}
                            { blog.tags?.map((tag, index) => (
                                <li key={index} className="text-sm bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-2.5 py-1">
                                    <Link href={`/blog?tag=${tag}`} className="inline-flex items-center hover:underline">
                                        <FaTag size={14} className="mr-1"/>
                                        {tag}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="blog-content mt-10"
                         dangerouslySetInnerHTML={{ __html: html }}>
                    </div>

                    {/* モバイル用: 目次（LG未満で表示） */}
                    {headings.length > 0 && (
                        <section className="mt-10 block lg:hidden">
                            <h2 className="font-bold text-xl mb-2">目次</h2>
                            <nav className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    {headings.map((heading, index) => (
                                        <li key={index} className={heading.depth === 2 ? "ml-0 font-medium" : "ml-4"}>
                                            <a href={`#${heading.slug}`} className="group">
                                                <span className="px-1 bg-orange-300 dark:bg-orange-900 rounded-md mr-2">{`h${heading.depth}`}</span>
                                                <span className="group-hover:underline">{heading.text}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </section>
                    )}

                </main>
                <footer className="mb-8 space-y-4 text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                        &copy; 2024-{new Date().getFullYear()} おかゆグループ. All rights reserved.
                    </p>
                </footer>
            </div>
            <aside className="hidden lg:fixed lg:right-0 lg:top-16 lg:bottom-0 lg:m-4 lg:w-80 rounded-lg border border-gray-600 backdrop-blur-sm py-4 px-6 flex-col lg:flex overflow-y-auto">
                <h2 className="font-bold text-xl mb-2">目次</h2>
                <section className="overflow-y-auto max-h-60 pb-4 border-b border-gray-600">
                    <nav>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            {headings.map((heading, index) => (
                                <li key={index} className={heading.depth === 2 ? "ml-0 font-medium" : "ml-4"}>
                                    <a href={`#${heading.slug}`} className="group">
                                        <span className="px-1 bg-orange-300 dark:bg-orange-900 rounded-md mr-2">{`h${heading.depth}`}</span>
                                        <span className="group-hover:underline">{heading.text}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </section>
                <section className="mt-4">
                    <h2 className="font-bold text-xl">ブログ</h2>
                    <form method="GET" action="/blog" className="mt-4 bg-gray-100 dark:bg-gray-800 flex items-center rounded-md border border-gray-400 dark:border-gray-600">
                        <button type="submit"><FaSearch size={20} className="mx-2"/></button>
                        <input type="text" name="word" className="w-full py-1" placeholder="検索"/>
                    </form>
                    <p className="mt-4 text-gray-500 mb-2">最新5件</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        {latestBlogs.map((b, i) => (
                            <li key={i}>
                                <a href={`/blog/${b.slug}`} className="hover:underline">
                                    {b.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
                <div className="mt-4 flex flex-col flex-1 justify-center text-center bg-gray-200 dark:bg-gray-800">
                    ここに広告を入れようと<br/>思っています
                </div>
            </aside>
        </SharedBody>
    } catch (e) {
        return <SharedBody>
            404 Not Found: {slug}
            <p>{e?.toString() ?? "[unknown error"}</p>
        </SharedBody>
    }
}