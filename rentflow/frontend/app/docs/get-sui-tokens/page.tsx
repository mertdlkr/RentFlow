import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function GetSuiTokensPage() {
    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 font-mono">
                <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-gray-500">Getting Started</span>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-primary">Get SUI Tokens</span>
            </nav>

            <section className="mb-20">
                <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    Get SUI Tokens
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                    You need SUI tokens to pay for gas fees and rental costs. Since RentFlow is currently on Testnet, you can get free SUI tokens from the faucet.
                </p>
                <div className="rounded-xl border border-white/10 bg-[#0d1117] p-6">
                    <h4 className="text-white font-bold mb-2">How to request Testnet SUI:</h4>
                    <ol className="list-decimal list-inside text-gray-400 space-y-2">
                        <li>Open your Sui Wallet extension.</li>
                        <li>Click on the menu icon (three bars).</li>
                        <li>Click "Request Testnet SUI Tokens".</li>
                        <li>Wait a few seconds for the tokens to appear.</li>
                    </ol>
                </div>
            </section>

            <div className="border-t border-white/10 pt-10 mt-16 flex flex-col md:flex-row gap-4 justify-between">
                <Link href="/docs/wallet-setup" className="group flex flex-col items-start p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Previous</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Wallet Setup
                    </div>
                </Link>
                <Link href="/docs/how-to-lend" className="group flex flex-col items-end p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2 text-right">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Next</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        How to Lend
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            </div>
        </>
    );
}
