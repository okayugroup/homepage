import Link from "next/link";
import { format } from "date-fns";

export function BlogFindByDate({
    date,
    className = "",
}: Readonly<{
    date: Date;
    className?: string;
}>) {
    const link = format(date, "yyyy-MM-dd");
    const name = format(date, "yyyy年MM月dd日");
    return <Link className="hover:underline" href={`/blogs?date=${link}`}><time dateTime={date.toISOString()} className={className}>{name}</time></Link>;
}