import {Team} from "@/db/teams";

export function SoftwareDevelopmentPage(): Team {
    const updated = new Date("2025-08-05");
    return new Team(
        "software",
        "ソフトウェア開発",
        "おかゆグループの総合的な管理",
        <>
            <p>おかゆグループソフトウェア開発チームでは、ソフトウェア開発に力を注いでいます。これはおかゆグループの主な活動の一つです。</p>
            <p>私たちは、プロジェクトの進行やコードレビュー、バグの修正、ドキュメントの整備などを通じて、ソフトウェアの品質向上に努めています。</p>
            <p>新しい技術の導入や、効率的な開発プロセスの確立にも取り組んでいます。</p>
        </>,
        [
            "yossy4411",
        ],
        updated,
        new Date("2024-10-01"),
        [
            {
                label: "お問い合わせ",
                url: "/contact?team=software"
            }
        ],
        [
            "ソフトウェアの開発",
            "プロジェクトの進行",
            "コードレビュー",
            "バグの修正",
            "ドキュメントの整備",
        ],
    );
}