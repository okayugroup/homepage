import {getAllBlogs} from "@/db/blog";
import Posts from "./posts";
import {Suspense} from "react";


export default async function BlogPage() {
    const blogs = await getAllBlogs();
    return <Suspense><Posts blogs={blogs}/></Suspense>
    // return <span>{blogs.toString()}</span>
}