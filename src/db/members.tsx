export type MemberData = {
    name: string;
    description: string;
    links: {
        [key: string]: string;
    };
    skills?: [string, number][];
    languages?: { [lang: string]: number };
    additionalTags?: {
        birthday?: Date;
        sex?: "male" | "female" | "other";
        location?: string;
    },
    aboutMe: string;  // Markdown形式の自己紹介
}

export class Member {
    id: string;
    data: MemberData;
    constructor(id: string, data: MemberData) {
        this.id = id;
        this.data = data;
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
                "Twitter": "https://x.com/yossy4411_dev",
                "Misskey": "https://okayugroup.net/@yossy4411",
                "Keybase": "https://keybase.io/yossy4411",
            },
            skills: [
                ["Web開発", 8],
                ["ネイティブアプリ開発", 9],
                ["プロジェクト管理", 7],
                ["チームビルディング", 8],
                ["バックエンド開発", 6],
                ["フロントエンド開発", 7],
                ["データベース設計", 4],
                ["UI/UXデザイン", 5],
                ["DevOps", 6],
                ["セキュリティ", 6],
                ["CI/CD", 6],
                ["API設計", 7],
            ],
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
            },
            aboutMe: (
`# yossy4411
こんにちは！おかゆグループの代表を務めているおかゆです。

私は趣味のプログラミングを通じて、社会をより良いものにするための活動をしています。`
            )
        }
    )
}