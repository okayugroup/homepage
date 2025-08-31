import {JSX} from "react";
import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import Link from "next/link";
import {FaArrowRight, FaRegClock} from "react-icons/fa6";
import {BlogFindByDate} from "@/components/blog-finder";
import {TeamIcon} from "@/components/team-icon";
import {Footer} from "@/components/Footer";
import {getAllBlogs} from "@/db/blog";

export type History = {
    date: Date;
    description: string;
}

export type TeamData = {
    name: string;
    description: string;
    summary: JSX.Element;
    members: string[];
    founded: Date;
    links: {
        url: string;
        label: string;
    }[];
    roles: (string | JSX.Element)[];
    addition?: JSX.Element;
    history?: History[];
}

export class Team {
    id: string;
    data: TeamData;
    lastUpdated: Date;
    constructor(
        id: string,
        data: TeamData,
        lastUpdated: Date,
    ) {
        this.id = id;
        this.data = data;
        this.lastUpdated = lastUpdated;
    }
}


const SoftwareDevelopment =
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

const Creators =
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


function ServerUptimeCard({title}: { title: string }): JSX.Element {
    return (
        <div className="flex flex-col md:flex-row xl:flex-col 2xl:flex-row gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl border-2 border-green-500">
            <div className="flex p-3 space-x-4
            flex-col sm:flex-row md:flex-col xl:flex-row 2xl:flex-col
            w-full md:w-2/5 xl:w-full 2xl:w-1/3">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">正常に動作しています。</p>
            </div>
            <div className="flex items-center justify-center bg-white/80 dark:bg-gray-700 rounded-md p-8 flex-1 mt-2 md:mt-0">
                <span>ここにグラフ入れたいやんね🤔</span>
            </div>
        </div>
    );
}

const Admin =
    new Team(
        "administrators",
        {
            name: "Administrators",
            description: "おかゆグループの総合的な管理",
            summary: <>
                <p>おかゆグループ
                    Administratorsは、グループ全体の運営を行うチームです。私たちは、プロジェクトの管理やメンバーのサポートを通じて、グループの活動を円滑に進めることを目指しています。</p>
                <p>新しいプロジェクトの企画や、イベントの運営などにも積極的にチャレンジしています。</p>
            </>,
            members: ["yossy4411"],
            founded: new Date("2025-08-01"),
            links: [
                {
                    label: "お問い合わせ",
                    url: "/contact?team=administrators"
                }
            ],
            roles: [
                "プロジェクトの管理",
                "メンバーのサポート",
                "グループの方針の決定",
                "お問い合わせの振り分け",
                "サーバーの管理",
                "スケジュールの調整"
            ],
            addition: <section>
                <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-bold">動作状況</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">最終更新: 2025/07/26<span
                        className="text-rose-700"> っていうふうに見せかけてるだけ</span></p>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                    <ServerUptimeCard title="Misskeyサーバー"/>
                    <ServerUptimeCard title="プロジェクト管理サーバー"/>
                </div>
            </section>,
            history: [{date: new Date("2025-07-16"), description: "設立を検討開始"}],
        },
        new Date("2025-08-04"),
    );

export const Teams: { [id: string]: Team } = {
    "administrators": Admin,
    "software": SoftwareDevelopment,
    "creators": Creators,
}