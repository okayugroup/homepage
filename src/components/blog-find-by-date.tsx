export function BlogFindByDate({
    date,
    className = "",
}: Readonly<{
    date: Date;
    className?: string;
}>) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Tokyo",
    };
    const formattedDate = new Intl.DateTimeFormat("ja-JP", options).format(date);
    return <time dateTime={date.toISOString()} className={className}>{formattedDate}</time>;
}