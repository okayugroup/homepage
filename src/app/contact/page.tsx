"use client";

import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import {Members} from "@/db/members";
import {Teams} from "@/db/teams";

export default function ContactPage() {
    const params = useSearchParams();

    const [type, setType] = useState(params.get("type") ?? undefined);

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
        <SharedBody>
            <Header currentPath={"/contact"} />
            <main className="flex flex-col justify-center gap-4 mb-16">
                <div className="pt-20 pb-5 text-center bg-gray-600 dark:bg-blue-900">
                    <h1 className="text-white font-extrabold text-3xl">お問い合わせ</h1>
                    <p className="text-gray-300 text-sm px-5 mt-1">
                        おかゆグループへのお問い合わせはこちらから
                    </p>
                </div>
                <div className="px-10 lg:px-30 space-y-6 lg:space-y-10 mt-5">
                    <form className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-4" method="POST" onSubmit={
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
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                                            <select id="contact-type" name="contact-type" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" required>
                                                <option value="" disabled>選択してください</option>
                                                <option value="general">おかゆグループ全般について</option>
                                                { Object.entries(Teams).map(([k, v]) => (
                                                    <option key={k} value={k}>チーム: {v.data.name}</option>
                                                )) }
                                            </select>
                                        ) :
                                        type === "business" ?
                                            (<select id="about" name="about" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" required>
                                                <option value="" disabled>選択してください</option>
                                                { Object.entries(Members).map(([k, v]) => (
                                                    <option key={k} value={k}>{v.data.name}</option>
                                                )) }
                                            </select>
                                        ) :
                                            type === "other" ?
                                                (<input type="text" id="about" name="about"
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                    placeholder="対象を具体的にご記入ください。" />) :
                                                type === "question" || type === "feedback" || type == null ?
                                                    (<select id="about" name="about" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" required>
                                                        <option value="" disabled>選択してください</option>
                                                        { Object.entries(Teams).map(([k, v]) => (
                                                            <option key={k} value={k}>チーム: {v.data.name}</option>
                                                        )) }
                                                        <option value="projects">プロジェクトについて</option>
                                                        <option value="website">ウェブサイトについて</option>
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
                            ※ 個人情報の取り扱いについては、プライバシーポリシーをご覧ください。
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            送信
                        </button>

                    </form>
                </div>
            </main>
        </SharedBody>
    );
}