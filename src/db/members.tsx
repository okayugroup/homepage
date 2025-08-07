import {JSX} from "react";
import Image from "next/image";
import {Roboto_Mono} from "next/font/google";
import {LiaBirthdayCakeSolid} from "react-icons/lia";

export type MemberData = {
    name: string;
    description: string;
    links: {
        [key: string]: string;
    };
    languages?: { [lang: string]: number };
    additionalTags?: {
        birthday?: Date;
        sex?: "male" | "female" | "other";
        location?: string;
    }
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
        const properties: string[] = [this.id];
        switch (this.data.additionalTags?.sex) {
            case "male":
                properties.push("男");
                break;
            case "female":
                properties.push("女");
                break;
            case "other":
                properties.push("その他");
                break;
        }
        return (
            <div className="flex flex-row gap-6 px-60">
                <div className="w-1/3 max-w-120 p-1">
                    <Image alt={`${this.data.name}のアイコン`} src={`/members/${this.id}.webp`} width={256} height={256} className="rounded-full border border-gray-300 mb-4" />
                    <section>
                        <h2 className="text-2xl font-bold mb-1">{this.data.name}</h2>
                        <div className="text-sm mb-3 text-gray-700">
                            <p>
                                {(()=> {
                                    const inner = properties.join(" · ")
                                    if (this.data.additionalTags?.birthday) {
                                        return <>
                                            <span>{inner + " · "}</span>
                                            <span className="relative group">
                                                {this.data.additionalTags?.birthday!.getFullYear()}年生
                                                <span className="text-gray-800 absolute opacity-0 group-hover:opacity-100 backdrop-blur-xs left-1 top-1 p-2 max-w-max rounded-xl shadow border border-gray-100 transition-opacity duration-150 bg-white/20">
                                                    <LiaBirthdayCakeSolid />{this.data.additionalTags.birthday.toLocaleDateString("ja-JP")}
                                                </span>
                                            </span>
                                        </>

                                    }
                                    return inner;
                                })()}
                            </p>
                        </div>

                        <p className="">{this.data.description}</p>
                    </section>

                </div>
                <div className="flex-1">
                    <section className="w-full p-8 rounded-2xl border border-gray-300">
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
                    </section>
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
                birthday: new Date("2010-08-16"),
                location: "Shiga, Japan",
                sex: "male",
            }
        }
    )
}