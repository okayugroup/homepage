import {Team} from "@/db/teams";

export const SoftwareDevelopmentPage =
    new Team(
        "software",
        {
            name:"ソフトウェア開発",
            description: "おかゆグループの総合的な管理",
            summary: <>
                <p>おかゆグループソフトウェア開発チームでは、ソフトウェア開発に力を注いでいます。これはおかゆグループの主な活動の一つです。</p>
                <p>私たちは、プロジェクトの進行やコードレビュー、バグの修正、ドキュメントの整備などを通じて、ソフトウェアの品質向上に努めています。</p>
                <p>新しい技術の導入や、効率的な開発プロセスの確立にも取り組んでいます。</p>
            </>,
            members: [ "yossy4411" ],
            founded: new Date("2024-10-01"),
            links: [
                {
                    label: "お問い合わせ",
                    url: "/contact?team=software"
                }
            ],
            roles: [
                "ソフトウェアの開発",
                "プロジェクトの進行",
                "コードレビュー",
                "バグの修正",
                "ドキュメントの整備",
            ],
        },
        new Date("2025-08-05")
    );