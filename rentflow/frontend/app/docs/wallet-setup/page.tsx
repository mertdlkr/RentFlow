import Link from "next/link";
import { Info, ExternalLink, Copy, AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";

export default function WalletSetupPage() {
    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 font-mono">
                <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-gray-500">Getting Started</span>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-primary">Wallet Setup</span>
            </nav>

            <section className="mb-20">
                <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    Wallet Setup
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                    To interact with RentFlow, you need a Sui-compatible wallet.
                </p>

                {/* Info Alert */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-10 flex gap-4 items-start shadow-[0_0_20px_rgba(13,227,242,0.05)]">
                    <Info className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                        <h4 className="text-white font-bold text-sm font-display mb-1">New to Sui Network?</h4>
                        <p className="text-sm text-gray-400">RentFlow runs on the Sui blockchain. Transactions are fast and gas fees are minimal, but you must have a Sui-compatible wallet to proceed.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <a href="https://suiwallet.com" target="_blank" className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-all group flex items-start gap-4 cursor-pointer border border-white/5 bg-white/5">
                        <div className="w-10 h-10 rounded-lg bg-[#3da4f7] flex items-center justify-center text-white font-bold text-lg shrink-0">S</div>
                        <div>
                            <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">Sui Wallet</h4>
                            <p className="text-xs text-gray-400">Official wallet by Mysten Labs.</p>
                        </div>
                        <ExternalLink className="w-5 h-5 ml-auto text-gray-500 group-hover:text-white" />
                    </a>
                    <a href="https://ethoswallet.xyz" target="_blank" className="glass-panel p-5 rounded-xl hover:bg-white/5 transition-all group flex items-start gap-4 cursor-pointer border border-white/5 bg-white/5">
                        <div className="w-10 h-10 rounded-lg bg-[#6f5af6] flex items-center justify-center text-white font-bold text-lg shrink-0">E</div>
                        <div>
                            <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">Ethos Wallet</h4>
                            <p className="text-xs text-gray-400">Easy-to-use wallet explorer.</p>
                        </div>
                        <ExternalLink className="w-5 h-5 ml-auto text-gray-500 group-hover:text-white" />
                    </a>
                </div>
            </section>

            <div className="border-t border-white/10 pt-10 mt-16 flex flex-col md:flex-row gap-4 justify-between">
                <Link href="/docs" className="group flex flex-col items-start p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Previous</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Introduction
                    </div>
                </Link>
                <Link href="/docs/get-sui-tokens" className="group flex flex-col items-end p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2 text-right">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Next</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        Get SUI Tokens
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            </div>
        </>
    );
}
