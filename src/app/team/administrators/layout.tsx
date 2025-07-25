import type {Metadata} from "next";
import {Noto_Sans_JP} from "next/font/google";

const notosansjp = Noto_Sans_JP ({
    variable: "--font-notosansjp",
    subsets: ["latin"],
    weight: ["500", "700"],
    display: "swap"
});

export const metadata: Metadata = {
    title: "OkayuGroup Administrators",
    description: "おかゆグループのプロジェクト管理とグループ全体の指揮・統括を行っています。",
};

export default function AdministratorLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
        <body className={`${notosansjp.variable} ${notosansjp.className} antialiased`}>
        {children}
        </body>
        </html>
    );
}
