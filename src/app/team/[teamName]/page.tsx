import {AdminPage} from "@/app/team/[teamName]/admin";
import {SoftwareDevelopmentPage} from "@/app/team/[teamName]/software";
import NotFound from "next/dist/client/components/builtin/not-found";
import {CreatorPage} from "@/app/team/[teamName]/creating";

export async function generateStaticParams() {
    const a = [
        "administrators",
        "software",
        "creators",
        "preparing",
    ]
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
        case "administrators":
            team = AdminPage;
            break;
        case "software":
            team = SoftwareDevelopmentPage;
            break;
        case "creators":
            team = CreatorPage;
            break;
        case "preparing":
            return <div className="text-center mt-20">
                <h1 className="text-2xl font-bold">準備中のチームです</h1>
                <p className="text-gray-500">このチームはまだ準備中です。詳細は後日公開されます。</p>
            </div>;
    }

    // ここでチームごとのページ内容を生成！
    return team ? team.getHtml() : NotFound();
}