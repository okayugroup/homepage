import {Header} from "@/components/Header";
import { SharedBody } from "@/components/shared-body";
import Link from "next/link";
import {Members} from "@/db/members";
import Image from "next/image";

export default function MembersPage() {
    return (
        <SharedBody>
            <Header currentPath={`/member`} />
            <main className="mt-24 m-10">
                <div className="text-center mt-20">
                    <h1 className="text-2xl font-bold">メンバー一覧</h1>
                    <p className="text-gray-500">メンバーの詳細は、各メンバーのページをご覧ください。</p>
                </div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { Object.values(Members).map((member, i) => (
                        <Link key={i} href={`/member/${member.id}`}>
                            <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <Image width={32} height={32} src={`/members/${member.id}.webp`} alt={`${member.id}'s icon`} className="rounded-full border-1 border-gray-400 dark:border-gray-600"/>
                                    <h2 className="text-xl font-bold">{member.data.name}</h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">{member.data.description}</p>
                                {!member.data.skills ? <></> :
                                    <div className="flex flex-wrap space-x-1 space-y-0.5 text-xs mt-3">
                                        {member.data.skills.filter(elem => elem[1] > 5).map((elem, i) => <p key={i} className="bg-fuchsia-200 py-1 px-2 rounded-full border-1 border-pink-300 shadow">{elem[0]}</p>)}
                                    </div>
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </SharedBody>

    );
}