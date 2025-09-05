import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";

export default function ThanksPage() {
    return <SharedBody>
        <Header currentPath={"/contact/thanks"}/>
        <div className="min-h-screen h-full flex flex-col pt-30">
            <main className="text-center mt-20 pb-40 mx-auto my-auto">
                <h1 className="text-3xl font-bold mb-6">お問い合わせありがとうございました</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    お問い合わせを受け付けました。<br/>
                    返信までにお時間をいただく場合がございますが、ご了承ください。
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    なお、内容によっては返信できない場合もございますので、あらかじめご了承ください。
                </p>
            </main>
            <Footer/>
        </div>

    </SharedBody>
}