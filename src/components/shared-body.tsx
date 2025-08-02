import {M_PLUS_1, Noto_Sans_JP} from "next/font/google";
import React from "react";


const mPlus1p = M_PLUS_1({
    variable: "--font-m-plus-1",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap"
});

export function SharedBody({ children, type }: Readonly<{ children: React.ReactNode; type?: string }>) {
    switch (type) {
        default:
        return (
            <div className={`${mPlus1p.variable} ${mPlus1p.className}`}>
                {children}
            </div>
        );
    }

}