import type {Metadata} from "next";
import {M_PLUS_1_Code, M_PLUS_1p, Noto_Sans_JP} from "next/font/google";
import "./globals.css";


const mPlus1p = M_PLUS_1p({
    variable: "--font-m-plus-1p",
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
    display: "swap"
});

const mPlus1Code = M_PLUS_1_Code({
    variable: "--font-m-plus-1-code",
    subsets: ["latin"],
    weight: "400",
    display: "swap"
});

const notosansjp = Noto_Sans_JP({
    variable: "--font-noto-sans-jp",
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap"
});

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
        {children}
        </html>
    );
}

export function DefaultBody({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={`${mPlus1p.variable} ${mPlus1Code.variable} font-sans antialiased`}>
        {children}
        </body>
    );
}

export function AdminBody({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body className={`${notosansjp.variable} ${notosansjp.className} antialiased`}>
        {children}
        </body>
    );
}