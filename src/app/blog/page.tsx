import {getAllBlogs} from "@/db/blog";
import Posts from "./posts";


export default async function BlogPage() {
    const blogs = await getAllBlogs();
    return <Posts blogs={blogs}/>
    // return <span>{blogs.toString()}</span>
}