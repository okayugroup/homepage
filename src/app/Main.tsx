export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 pt-20">
        {children}
        </main>
    );
}