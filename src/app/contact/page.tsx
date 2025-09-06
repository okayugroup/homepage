"use client";

import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import {useSearchParams} from "next/navigation";
import {Suspense, useState} from "react";
import {Members} from "@/db/members";
import {Teams} from "@/db/teams";
import Link from "next/link";
import {Footer} from "@/components/Footer";


function Form() {
    const params = useSearchParams();
    let _type = params.get("type") ?? undefined;
    if (params.get("question") !== null) _type = "question";
    if (params.get("feedback") !== null) _type = "feedback";
    if (params.get("business") !== null) _type = "business";
    if (params.get("membership") !== null) _type = "membership";
    if (params.get("other") !== null) _type = "other";

    const [type, setType] = useState(_type);
    const contactFor = type !== undefined ? params.get("for") ?? undefined : undefined;
    const [replyWay, setReplyWay] = useState("mail");

    const replyWayMap: { [key: string]: { label: string, placeHolder: string } } = {
        mail: { label: "メールアドレス", placeHolder: "user@example.com" },
        twitter: { label: "Twitter(現X) のアカウント名", placeHolder: "@username" },
        mastodon: { label: "Mastodonのアカウント名", placeHolder: "@username@mastodon.social" },
        discord: { label: "Discordのユーザー名", placeHolder: "username#1234" },
        bluesky: { label: "Blueskyのアカウント名", placeHolder: "@username.bsky.social" },
        none: { label: "不要", placeHolder: "" },
    };

    return (
        <form className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4" method="POST" onSubmit={
            (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                fetch("https://api.okayugroup.com/contact", {
                    method: "POST",
                    body: formData
                }).then(res => {
                    if (res.ok) {
                        location.href = "/contact/thanks";
                        form.reset();
                        setType(undefined);
                        setReplyWay("mail");
                    } else {
                        location.href = "/contact/error?status=" + res.status;
                    }
                }).catch(() => {
                    location.href = "/contact/error?status=network";
                });
            }
        }>
            <section>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">お名前 (任意)</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" placeholder="山田 太郎" />
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="reply-way" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">折り返しの方法</label>
                    <select name="reply-way" id="rep-way" required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500s dark:bg-gray-700 dark:text-white"
                            value={replyWay}
                            onChange={(e) => setReplyWay(e.target.value)}>
                        <option value="mail">メール</option>
                        <option value="twitter">Twitter(現X) のDM</option>
                        <option value="mastodon">Mastodon(またはその派生) のDM</option>
                        <option value="discord">DiscordのDM</option>
                        <option value="bluesky">BlueskyのDM</option>
                        <option value="none">不要</option>

                    </select>
                </div>

                {replyWay === "none" ? <></> :
                    <div>
                        <label htmlFor="reply-address"
                               className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">メールアドレス</label>
                        <input type={replyWay === "mail" ? "mail" : "text"} id="reply-address" name="reply-address"
                               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                               placeholder={replyWayMap[replyWay].placeHolder}/>
                    </div>}
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="contact-type" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">種別</label>
                    <select id="contact-type" name="contact-type"
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            value={type ?? undefined}
                            onChange={(e) => setType(e.target.value)}>
                        <option value="" disabled>選択してください</option>
                        <option value="question">質問・相談</option>
                        <option value="feedback">フィードバック・要望</option>
                        <option value="business">ビジネス・コラボレーション</option>
                        <option value="membership">メンバーシップ・参加希望</option>
                        <option value="other">その他</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="about" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">対象</label>
                    {
                        type === "membership" ?
                            (
                                <select
                                    id="contact-type"
                                    name="contact-type"
                                    defaultValue={contactFor}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" required>
                                    <option value="" disabled>選択してください</option>
                                    <option value="general">おかゆグループ全般について</option>
                                    { Object.entries(Teams).map(([k, v]) => (
                                        <option key={k} value={"team-" + k}>チーム: {v.data.name}</option>
                                    )) }
                                </select>
                            ) :
                            type === "business" ?
                                (<select
                                        id="about"
                                        name="about"
                                        defaultValue={contactFor}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" required>
                                        <option value="" disabled>選択してください</option>
                                        { Object.entries(Members).map(([k, v]) => (
                                            <option key={k} value={"member-" + k}>{v.data.name}</option>
                                        )) }
                                    </select>
                                ) :
                                type === "other" ?
                                    (<input type="text" id="about" name="about"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="対象を具体的にご記入ください。" />) :
                                    type === "question" || type === "feedback" || type == null ?
                                        (<select id="about"
                                                 name="about"
                                                 defaultValue={contactFor}
                                                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" required>
                                            <option value="" disabled>選択してください</option>
                                            { Object.entries(Teams).map(([k, v]) => (
                                                <option key={k} value={"team-" + k}>チーム: {v.data.name}</option>
                                            )) }
                                            <option value="projects">プロジェクトについて</option>
                                            <option value="website">ウェブサイトについて</option>
                                            <option value="other-software">その他のソフトウェアについて</option>
                                            <option value="general">おかゆグループ全般について</option>
                                            <option value="privacy">プライバシー・個人情報について</option>
                                            <option value="other">その他</option>
                                        </select>) :
                                        <input type="text" id="about" name="about"
                                               required
                                               className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                               placeholder="対象を具体的にご記入ください。" />

                    }
                </div>
            </section>
            <section>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">メッセージ</label>
                <textarea id="message" name="message"
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          rows={6}
                          placeholder="お問い合わせ内容をご記入ください。"></textarea>
            </section>
            <div className="text-sm text-gray-600 dark:text-gray-400">
                ※ 送信前に、もう一度内容をご確認ください。<br />
                ※ 返信にはお時間をいただく場合があります。ご了承ください。<br />
                ※ 個人情報の取り扱いについては、<Link className="hover:underline" href="#policy">プライバシーポリシー</Link>をご覧ください。
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                送信
            </button>



        </form>
    )
}


export default function ContactPage() {

    return (
        <SharedBody>
            <Header currentPath={"/contact"} />
            <main className="flex flex-col justify-center gap-4 mb-16">
                <div className="pt-20 pb-5 text-center bg-gray-600 dark:bg-blue-900">
                    <h1 className="text-white font-extrabold text-3xl">お問い合わせ</h1>
                    <p className="text-gray-300 text-sm px-5 mt-1">
                        おかゆグループへのお問い合わせはこちらから
                    </p>
                </div>
                <div className="px-10 lg:px-15 space-y-6 lg:space-y-10 mt-5 lg:flex gap-6">
                    <Suspense>
                        <Form />
                    </Suspense>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex-1/2">
                        <h2 className="text-xl font-bold" id="policy">プライバシーポリシー</h2>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            おかゆグループ（以下、「当グループ」）は、お問い合わせフォームを通じて収集する個人情報の保護に努めています。
                            以下に、当グループのプライバシーポリシーを示します。
                        </p>
                        <h3 className="text-lg font-semibold mt-4">1. 収集する情報</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            お問い合わせフォームを通じて、以下の情報を収集することがあります。
                        </p>
                        <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                            <li>お名前（任意）</li>
                            <li>連絡先（メールアドレス、SNSアカウントなど）</li>
                            <li>お問い合わせ内容</li>
                            <li>その他、提供いただく情報</li>
                        </ul>
                        <h3 className="text-lg font-semibold mt-4">2. 利用目的</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            収集した情報は、以下の目的で利用します。
                        </p>
                        <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                            <li>お問い合わせへの対応</li>
                            <li>サービスの改善および新サービスの開発</li>
                            <li>法令遵守および規約違反の防止</li>
                        </ul>
                        <h3 className="text-lg font-semibold mt-4">3. 第三者提供</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            当グループは、<Link href="https://laws.e-gov.go.jp/law/415AC0000000057" className="underline">法令</Link>に基づく場合を除き、収集した個人情報を第三者に提供することはありません。
                        </p>
                        <h3 className="text-lg font-semibold mt-4">4. 保護措置</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            当グループは、個人情報の漏洩、紛失、改ざんなどを防止するため、適切な技術的および組織的な措置を講じます。
                        </p>
                        <h3 className="text-lg font-semibold mt-4">5. お問い合わせ</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            個人情報の取り扱いに関するお問い合わせは、<a href="/contact?question&for=privacy" className="text-blue-600 dark:text-blue-400 underline">お問い合わせフォーム</a>からご連絡ください。
                        </p>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            最終更新日: 2025年8月4日
                        </p>
                    </div>
                </div>
            </main>
            <Footer/>
        </SharedBody>
    );
}