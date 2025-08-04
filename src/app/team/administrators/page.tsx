import type {Metadata} from "next";
import { Team } from "@/db/teams";

export const metadata: Metadata = {
    title: "OkayuGroup Administrators | Home",
    description: "おかゆグループのプロジェクト管理とグループ全体の指揮・統括を行っています。",
};

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

export default function AdminPage() {
    const updated = new Date("2025-08-04");
    const team = new Team(
        "administrators",
    "Administrators",
        "おかゆグループの総合的な管理",
        <>
            <p>おかゆグループ Administratorsは、グループ全体の運営を行うチームです。私たちは、プロジェクトの管理やメンバーのサポートを通じて、グループの活動を円滑に進めることを目指しています。</p>
            <p>新しいプロジェクトの企画や、イベントの運営などにも積極的にチャレンジしています。</p>
        </>,
        [
            "yossy4411",
        ],
        updated,
        new Date("2025-08-01"),
        [
            {
                label: "お問い合わせ",
                url: "/contact?team=administrators"
            }
        ],
        [
            "プロジェクトの管理",
            "メンバーのサポート",
            "グループの方針の決定",
            "お問い合わせの振り分け",
            "サーバーの管理",
            "スケジュールの調整"
        ],
        <section>
            <div className="flex items-end justify-between">
                <h2 className="text-3xl font-bold">動作状況</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">最終更新: 2025/07/26<span className="text-rose-700"> っていうふうに見せかけてるだけ</span></p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                <ServerUptimeCard title="Misskeyサーバー"/>
                <ServerUptimeCard title="プロジェクト管理サーバー"/>
            </div>
        </section>
    )
    return team.getHtml();
}