import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";

export default function ThanksPage() {
    return <SharedBody>
        <Header currentPath={"/contact/thanks"}/>
        <main className="flex flex-col justify-center items-center text-center pt-20 pb-40 px-5 h-full min-h-screen">
            <h1 className="text-3xl font-bold mb-6">お問い合わせありがとうございました</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                お問い合わせを受け付けました。<br/>
                返信までにお時間をいただく場合がございますが、ご了承ください。
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
                なお、内容によっては返信できない場合もございますので、あらかじめご了承ください。
            </p>
        </main>
    </SharedBody>
}