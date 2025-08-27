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
import {FaSearch} from "react-icons/fa";

export async function generateStaticParams() {
    return (await getAllBlogs()).map(blog => {
        return ({ slug: blog.slug })
    });
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const [blog, content] = await getBlogContent(slug);
        const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, { allowDangerousHtml: true }) // raw を使う場合は allowDangerousHtml
            .use(rehypeRaw) // 生HTMLを許可する場合のみ
            .use(rehypeHighlight) // シンタックスハイライト
            .use(rehypeStringify)
            .process(content);

        const tree = unified()
            .use(remarkParse)
            .parse(content) as Root;
        const headings = tree.children
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
                    return { depth: node.depth, text };
                }
                return null;
            })
            .filter((heading)=> heading !== null);

        const html = String(file);
        return <SharedBody>
            <Header currentPath={'/blog/' + slug} />
            <main className="mt-24 pl-20 xl:pl-40 pr-88 xl:pr-94 pb-20">
                <div>
                    <h1 className="text-3xl font-bold">{blog.title}</h1>
                    <div className="text-gray-500 mt-2 flex flex-row flex-wrap list-disc space-x-2 space-y-1">
                        <span>{(blog.createdAt ?? blog.updatedAt)?.toLocaleDateString() ?? "投稿時間不明"}</span>
                        <span>{blog.author ? "投稿者: " + blog.author : "匿名"}</span>
                    </div>
                </div>
                <div className="blog-content mt-10"
                     dangerouslySetInnerHTML={{ __html: html }}>
                </div>
            </main>
            <aside className="fixed right-0 top-16 bottom-0 m-4 w-80 rounded-lg border border-gray-600 backdrop-blur-sm py-4 px-6 flex flex-col">
                <h2 className="font-bold text-xl mb-2">目次</h2>
                <section className="overflow-y-auto max-h-60 pb-4 border-b border-gray-600">
                    <nav>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            {headings.map((heading, index) => (
                                <li key={index} className={heading.depth === 2 ? "ml-0 font-medium" : "ml-4"}>
                                    <a href={"#"+heading.text.replace(/\s+/g, '-').toLowerCase()} className="group">
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
                    <div className="mt-4 bg-gray-800 flex items-center rounded-md border border-gray-600 shadow">
                        <FaSearch size={20} className="mx-2"/>
                        <input type="text" className="w-full py-1" placeholder="検索"/>
                    </div>
                    <p className="mt-4 text-gray-500 mb-2">最新5件</p>
                    <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        {(await getAllBlogs()).slice(0, 5).map((b, i) => (
                            <li key={i}>
                                <a href={`/blog/${b.slug}`} className="hover:underline">
                                    {b.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
                <div className="mt-4 flex flex-col flex-1 justify-center text-center bg-gray-200 dark:bg-gray-800
                ">ここに広告を入れようと<br/>思っています</div>
            </aside>
        </SharedBody>
    } catch (e) {
        return <SharedBody>
            404 Not Found: {slug}
            <p>{e?.toString() ?? "[unknown error"}</p>
        </SharedBody>
    }
}