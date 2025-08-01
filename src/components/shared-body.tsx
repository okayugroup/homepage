import {M_PLUS_1, Noto_Sans_JP} from "next/font/google";
import React from "react";


const mPlus1p = M_PLUS_1({
    variable: "--font-m-plus-1",
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
    display: "swap"
});


const notosansjp = Noto_Sans_JP({
    variable: "--font-noto-sans-jp",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: "swap"
});

export function SharedBody({ children, type }: Readonly<{ children: React.ReactNode; type: string }>) {
    switch (type) {
        case "admin":
        return (
            <div className={`${notosansjp.variable} ${notosansjp.className}`}>
            {children}
            </div>
        );
        default:
        return (
            <div className={`${mPlus1p.variable} ${mPlus1p.className}`}>
                {children}
            </div>
        );
    }

}