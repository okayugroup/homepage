import {JSX} from "react";
import Image from "next/image";
import {Roboto_Mono} from "next/font/google";

export type MemberData = {
    name: string;
    description: string;
    links: {
        [key: string]: string;
    };
    languages?: { [lang: string]: number };
    additionalTags?: { [tag: string]: string | number | boolean;}
}

const codeFont = Roboto_Mono({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap"
});

export class Member {
    id: string;
    data: MemberData;
    constructor(id: string, data: MemberData) {
        this.id = id;
        this.data = data;
    }

    getHtml(): JSX.Element {
        const properies = this.data.additionalTags ? Object.entries(this.data.additionalTags).map(([key, value]) => (`${key}: ${value}`)).join("\n") : "";
        return (
            <div className="flex flex-row gap-6 px-60">
                <div className="w-1/3 max-w-120 p-1">
                    <Image alt={`${this.data.name}のアイコン`} src={`/members/${this.id}.webp`} width={256} height={256} className="rounded-full border border-gray-300 mb-4" />
                    <section>
                        <h2 className="text-2xl font-bold mb-1">{this.data.name}</h2>
                        <p className={`text-sm mb-3`}><span className={codeFont.className}>{this.id}</span> · 男 · 2010年生</p>
                        <p className="text-gray-500">{this.data.description}</p>
                    </section>

                </div>
                <div className="flex-1 text-center">

                    <p>{this.data.description}</p>
                    <ul>
                        {Object.entries(this.data.links).map(([key, value]) => (
                            <li key={key}>
                                <a href={value} target="_blank" rel="noopener noreferrer">{key}</a>
                            </li>
                        ))}
                    </ul>
                    {this.data.languages && (
                        <div className="skills">
                            <h3>Skills</h3>
                            <ul>
                                {Object.entries(this.data.languages).map(([skill, level]) => (
                                    <li key={skill}>{skill}: {level}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export const Members: { [key: string]: Member } = {
    "yossy4411": new Member(
        "yossy4411",
        {
            name: "おかゆ (yossy4411)",
            description: "おかゆグループ創設者・代表。",
            links: {
                "GitHub": "https://github.com/yossy4411",
                "Twitter": "https://twitter.com/yossy4411",
            },
            languages: {
                "Rust": 8,
                "TypeScript": 6.5,
                "JavaScript": 4,
                "Python": 3,
                "Go": 7,
                "C++": 2,

            },
            additionalTags: {
                "role": "member",
                "age": 14,
                "location": "Shiga, Japan",
            }
        }
    )
}