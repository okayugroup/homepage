import type {Metadata} from "next";
import {M_PLUS_1_Code, M_PLUS_1p} from "next/font/google";
import "./globals.css";


const mPlus1p = M_PLUS_1p({
    variable: "--font-m-plus-1p",
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"]
});

const mPlus1Code = M_PLUS_1_Code({
    variable: "--font-m-plus-1-code",
    subsets: ["latin"],
    weight: "400"
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
        <body
            className={`${mPlus1p.className} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
