import Image from 'next/image';

export default function KireinaPage() {
    return (<>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
            <div className="space-y-20 text-center my-80">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">きれいなページ</h1>
                <div className="text-lg text-gray-600 dark:text-gray-400 space-y-10">
                    <p>これは、Tailwind CSSを使用して作成されたきれいなページです。</p>
                    <p>単純にガラスモーフィズムを試してみたかっただけです。</p>
                </div>
                <Image src="/shiga.webp" alt="きれいな画像" width={600} height={400} className="rounded-lg shadow-lg" />

            </div>


            <div className="fixed bottom-2 flex flex-row items-center justify-center border border-white/20 mx-14 w-auto max-w-screen p-10 px-20 rounded-full backdrop-blur-[5px] bg-gradient-to-b from-white/50 via-gray-400/30 to-white/30 shadow-lg divide-solid divide-x-2 divide-black [&>*]:px-2 text-gray-800">
                <p>ここはなーんだ</p>
                <p>なんだろうね</p>
                <p>きれいなページだよ</p>
                <p>きれいなページだね</p>
                <p>Tailwindはすてきだね</p>
            </div>
        </div>
        </>
    );
}