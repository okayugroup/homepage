import { promises as fs } from 'fs'
import path from "node:path";
import matter from "gray-matter";
import {unified} from "unified";
import remarkParse from "remark-parse";
import {Root} from "mdast";


export type Blog = {
    fileName: string;
    title: string;
    slug: string;
    categories?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    author?: string;
    description?: string;
    image?: string;
    tags?: string[];
}

const BLOG_DIR = "blogs/";

async function readAllMarkdownFiles(dir: string = BLOG_DIR): Promise<Blog[]> {
    let results: Blog[] = [];
    try {
        const entries = await fs.readdir(dir, {withFileTypes: true});
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                const nested = await readAllMarkdownFiles(fullPath);
                results = results.concat(nested);
            } else if (entry.isFile() && path.extname(entry.name) === '.md') {
                // .mdファイルなら読み込む
                const content = await fs.readFile(fullPath, 'utf-8');
                results.push(parseToBlog(entry.name, content));
            }
        }
        return results;
    } catch (error) {
        console.error(`Error reading markdown files in directory ${dir}:`, error);
        return results; // エラーが発生しても空の配列を返す
    }
}

function parseToBlog(fileName: string, fileContent: string): Blog {
    const { data, content } = matter(fileContent);
    const slug = toKebabCase((data['slug'] as string | undefined) || path.basename(fileName, '.md'));
    const categories = (data['categories'] as string[] | undefined);
    const createdAt = data['createdAt'] ? new Date(data['createdAt']) : data['created'] ? new Date(data['created']) :  undefined;
    const updatedAt = data['updatedAt'] ? new Date(data['updatedAt']) : (data['updated'] ? new Date(data['updated']) : (data['date'] ? new Date(data['date']) : undefined));
    const author = data['author'] as string | undefined;
    const description = data['description'] as string | undefined;
    const image = data['image'] as string | undefined;
    const tags = data['tags'] as string[] | undefined;

    const tree = unified()
        .use(remarkParse)
        .parse(content) as Root;

    let title = data['title'] as string | undefined;
    const mayBeHead = tree.children[0];
    if (mayBeHead && mayBeHead.type === 'heading' && mayBeHead.depth === 1) {
        tree.children.shift(); // 最初の見出しを削除
        // 最初の見出しがH1ならタイトルとして
        title = mayBeHead.children.map(child => {
            if (child.type === 'text') {
                return child.value;
            } else if (child.type === 'link' && child.children) {
                return child.children.map(c => c.type === 'text' ? c.value : '').join('');
            }
            return '';
        }).join('');
    }
    if (!title) {
        // タイトルがなければファイル名から生成
        title = path.basename(fileName, '.md').replace(/-/g, ' ');
    }
    return {
        fileName,
        title,
        categories,
        slug,
        createdAt,
        updatedAt,
        author,
        description,
        image,
        tags,
    }

}


export function toKebabCase(input: string): string {
    return input
        // まず大文字と小文字の境界にハイフンを入れる（例: HelloWorld → Hello-World）
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        // アンダースコア・空白・連続ハイフンを全部ハイフンに統一
        .replace(/[_\s]+/g, '-')
        // 複数ハイフンを1つにまとめる
        .replace(/-+/g, '-')
        // すべて小文字に
        .toLowerCase()
        // 先頭・末尾のハイフンを削除
        .replace(/^[-]+|[-]+$/g, '');
}

export async function getAllBlogs(): Promise<Blog[]> {
    const blogs = await readAllMarkdownFiles();
    // ソート: 新しい順に
    blogs.sort((a, b) => {
        const aDate = new Date(a.updatedAt || a.createdAt || 0);
        const bDate = new Date(b.updatedAt || b.createdAt || 0);
        return bDate.getTime() - aDate.getTime();
    });
    return blogs;
}

export async function getBlogContent(slug: string): Promise<string> {
    const blogs = await getAllBlogs();
    const blog = blogs.find(b => b.slug === slug);
    if (!blog) {
        throw new Error(`Blog with slug "${slug}" not found`);
    }
    const fileContent = await fs.readFile(BLOG_DIR + blog.fileName, "utf8");
    const { content } = matter(fileContent);
    return content;
}