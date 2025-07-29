import {M_PLUS_1_Code, M_PLUS_1} from "next/font/google";
import React from "react";

const mPlus1p = M_PLUS_1({
    variable: "--font-m-plus-1",
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