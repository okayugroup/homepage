import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "おかゆグループ ホームページ",
    description: "Next app",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
        <body className="antialiased">
        {children}
        <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7367654954874406"
                crossOrigin="anonymous"></script>
        </body>
        </html>
    );
}