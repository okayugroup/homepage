import {SharedBody} from "@/components/shared-body";
import {Blog, getAllBlogs, getBlogContent} from "@/db/blog";
import * as fs from "fs/promises";
import {Header} from "@/components/Header";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import {unified} from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";


export async function generateStaticParams() {
    return (await getAllBlogs()).map(blog => {
        return ({ slug: blog.slug })
    });
}


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        const content = await getBlogContent(slug);
        const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, { allowDangerousHtml: true }) // raw を使う場合は allowDangerousHtml
            .use(rehypeRaw) // 生HTMLを許可する場合のみ
            .use(rehypeHighlight) // シンタックスハイライト
            .use(rehypeStringify)
            .process(content);

        const html = String(file);
        return <SharedBody>
            <Header currentPath={'/blog/' + slug} />
            <main className="mt-24 m-10" dangerouslySetInnerHTML={{ __html: html }} />
        </SharedBody>
    } catch (e) {
        return <SharedBody>
            404 Not Found: {slug}
            <p>{e?.toString() ?? "[unknown error"}</p>
        </SharedBody>
    }
}