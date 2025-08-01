import {Noto_Sans_JP} from "next/font/google";
import React from "react";

const notosansjp = Noto_Sans_JP({
    variable: "--font-noto-sans-jp",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: "swap"
});

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