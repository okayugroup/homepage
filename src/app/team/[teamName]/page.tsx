import NotFound from "next/dist/client/components/builtin/not-found";
import {Teams} from "@/db/teams";

export async function generateStaticParams() {
    const a = Object.keys(Teams);
    a.push("preparing");
    return a.map(teamName => {
        return ({ teamName })
    });
}

type Props = {
    params: Promise<{ teamName: string }>;
};

export default async function TeamPage({ params }: Props) {
    const { teamName } = await params;
    let team;
    switch (teamName) {
        case "preparing":
            return <div className="text-center mt-20">
                <h1 className="text-2xl font-bold">準備中のチームです</h1>
                <p className="text-gray-500">このチームはまだ準備中です。詳細は後日公開されます。</p>
            </div>;
        default:
            team = Teams[teamName];
    }

    // ここでチームごとのページ内容を生成！
    return team ? team.getHtml() : NotFound();
}