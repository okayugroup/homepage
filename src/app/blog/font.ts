import {JetBrains_Mono} from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["500"],
    display: "swap",
    variable: "--font-jetbrains-mono"
})

export function getMonoFontClass() {
    return jetBrainsMono.className;
}