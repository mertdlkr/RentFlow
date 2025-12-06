import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function IntroductionPage() {
    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 font-mono">
                <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-primary">Introduction</span>
            </nav>

            <section className="mb-20">
                <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    Introduction to RentFlow
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                    RentFlow is the first collateral-free NFT rental protocol on the Sui Network. We empower gamers to access high-utility assets without capital lockup, and enable asset owners to generate passive yield.
                </p>
            </section>

            <div className="border-t border-white/10 pt-10 mt-16 flex flex-col md:flex-row gap-4 justify-end">
                <Link href="/docs/wallet-setup" className="group flex flex-col items-end p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2 text-right">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Next</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        Wallet Setup
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            </div>
        </>
    );
}
