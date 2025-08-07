import NotFound from "next/dist/client/components/builtin/not-found";
import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import {Members} from "@/db/members";

export async function generateStaticParams() {
    return Object.keys(Members).map(memberName => {
        return ({ memberName })
    });
}

type Props = {
    params: Promise<{ memberName: string }>;
};

export default async function TeamPage({ params }: Props) {
    const { memberName } = await params;
    const member = Members[memberName];

    // ここでチームごとのページ内容を生成！
    if (!member) {
        return NotFound();
    }
    return <SharedBody>
        <Header currentPath={`/member/${memberName}`} />
        <main className="mt-24 m-10">
            {member.getHtml()}
        </main>

    </SharedBody>
}