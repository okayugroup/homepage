import {Header} from "@/components/Header";
import { SharedBody } from "@/components/shared-body";
import Link from "next/link";
import {Members} from "@/db/members";
import Image from "next/image";
import React from "react";

export default function MembersPage() {
    return (
        <SharedBody>
            <Header currentPath={`/member`} />
            <main className="flex flex-col justify-center gap-4 mb-16">
                <div className="pt-20 pb-5 text-center bg-gray-600 dark:bg-blue-900">
                    <h1 className="text-white font-extrabold text-3xl">メンバー</h1>
                    <p className="text-gray-300 text-sm px-5 mt-1">
                        メンバーについての詳細は、各メンバーのページをご覧ください。
                    </p>
                </div>
                <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    { Object.values(Members).map((member, i) => (
                        <Link key={i} href={`/member/${member.id}`}>
                            <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <Image width={32} height={32} src={`/members/${member.id}.webp`} alt={`${member.id}'s icon`} className="rounded-full border-1 border-gray-400 dark:border-gray-600 dark:drop-shadow drop-shadow-white"/>
                                    <h2 className="text-xl font-bold">{member.data.name}</h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">{member.data.description}</p>
                                {!member.data.skills ? <></> :
                                    <div className="flex flex-wrap space-x-1 space-y-0.5 text-xs mt-3">
                                        {member.data.skills.filter(elem => elem[1] > 5).map((elem, i) => <p key={i} className="bg-fuchsia-200 dark:bg-pink-600/70 py-1 px-2 rounded-full border-1 dark:border-0 border-pink-300 shadow dark:shadow-none">{elem[0]}</p>)}
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