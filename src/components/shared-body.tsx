import {M_PLUS_1} from "next/font/google";
import React, {JSX} from "react";


const mPlus1p = M_PLUS_1({
    variable: "--font-m-plus-1",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap"
});

export function SharedBody({ children, type, className }: Readonly<{ children: React.ReactNode; type?: string; className?: string }>): JSX.Element {
    switch (type) {
        default:
        return (
            <div className={`${mPlus1p.variable} ${mPlus1p.className} ${className}`}>
                {children}
            </div>
        );
    }

}