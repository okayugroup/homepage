import {AdminPage} from "@/app/team/administrators/const";
import NotFound from "next/dist/client/components/builtin/not-found";

export async function generateStaticParams(): Promise<Props[]> {
    return [
        { params: { teamName: "administrators" } }
    ];
}

type Props = {
    params: { teamName: string };
};

export default function TeamPage({ params }: Props) {
    const { teamName } = params;
    let team;
    switch (teamName) {
        case "administrators":
            team = AdminPage();
            break;
    }

    // ここでチームごとのページ内容を生成！
    return team ? team.getHtml() : NotFound();
}