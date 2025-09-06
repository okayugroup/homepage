import {SharedBody} from "@/components/shared-body";
import {Header} from "@/components/Header";
import {FaExclamationTriangle} from "react-icons/fa";
import Link from "next/link";
import {Footer} from "@/components/Footer";

export default function ErrorPage() {
    return <SharedBody>
        <Header currentPath={"/contact/error"}/>
        <div className="min-h-screen h-full flex flex-col pt-30">
            <main className="text-center mt-20 pb-40 mx-auto my-auto flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-red-500 animate-pulse flex items-center"><FaExclamationTriangle className="mr-5" size={48} />お問い合わせの送信中にエラー</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    お問い合わせの送信中にエラーが発生しました。<br/>
                    お手数ですが、もう一度お試しいただくか、時間をおいて再度送信してください。
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    この問題はおかゆグループへ自動的に報告されます。<br/>
                    引き続き問題が発生する場合は、直接メールでお問い合わせください。<br/>
                    （メールアドレスは<Link href="mailto:yossy4411.dev@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">yossy4411.dev@gmail.com</Link>です）
                </p>
            </main>
            <Footer/>
        </div>
    </SharedBody>
}