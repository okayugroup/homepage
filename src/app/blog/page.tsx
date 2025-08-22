import {JetBrains_Mono} from "next/font/google";
import Posts from "./posts";
import {getAllBlogs} from "@/db/blog/avail";


const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["500"],
    display: "swap",
    variable: "--font-jetbrains-mono"
})

export function getMonoFontClass() {
    return jetBrainsMono.className;
}

export default async function BlogPage() {
    const blogs = await getAllBlogs();
    return <Posts blogs={blogs}/>
}