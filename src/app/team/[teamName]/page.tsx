import {AdminPage} from "@/app/team/[teamName]/admin";
import {SoftwareDevelopmentPage} from "@/app/team/[teamName]/software";
import NotFound from "next/dist/client/components/builtin/not-found";

export async function generateStaticParams() {
    const a = [
        "administrators",
        "software"
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
            team = AdminPage();
            break;
        case "software":
            team = SoftwareDevelopmentPage();
            break;
    }

    // ここでチームごとのページ内容を生成！
    return team ? team.getHtml() : NotFound();
}