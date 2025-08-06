import {Team} from "@/db/teams";

export const CreatorPage =
    new Team(
        "creators",
        {
            name:"クリエイター",
            description: "広報とデザイニング",
            summary: <>
                <p>おかゆグループクリエイターチームは、ソフトウェア等のデザインやSNSの運用を担当しています。</p>
                <p>私たちは、グループのイメージを向上させるために、魅力的なコンテンツの制作や、SNSでの情報発信に力を入れています。</p>
                <p>ソフトウェア面では、UI/UXの向上や、ユーザーフィードバックの収集を通じて、より使いやすい製品の開発に取り組んでいます。</p>
            </>,
            members: [ "yossy4411" ],
            founded: new Date("2025-08-06"),
            links: [
                {
                    label: "お問い合わせ",
                    url: "/contact?team=creators"
                }
            ],
            roles: [
                "ソフトウェアのデザイン",
                "SNSの運用",
                "コンテンツ制作",
                "UI/UXの向上",
                "ユーザーフィードバックの収集"
            ],
            history: [
                {
                    date: new Date("2024-08-05"),
                    description: "ソフトウェア開発チームからの分離"
                },
            ]
        },
        new Date("2025-08-05")
    );