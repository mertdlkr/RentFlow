import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HowToRentPage() {
    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 font-mono">
                <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-gray-500">User Guides</span>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-primary">How to Rent</span>
            </nav>

            <section className="mb-20">
                <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    How to Rent
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                    Rent high-tier gaming assets instantly without collateral.
                </p>
                <ul className="space-y-4 text-gray-400">
                    <li className="flex gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary text-xs font-bold shrink-0">1</span>
                        <span>Browse the <strong>Marketplace</strong> for available items.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary text-xs font-bold shrink-0">2</span>
                        <span>Click "Rent Now" on an item.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary text-xs font-bold shrink-0">3</span>
                        <span>Enter the duration (in days) you want to rent for.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary text-xs font-bold shrink-0">4</span>
                        <span>Pay the rental fee. You will receive a "RentPass" NFT that grants you access to the item in-game.</span>
                    </li>
                </ul>
            </section>

            <div className="border-t border-white/10 pt-10 mt-16 flex flex-col md:flex-row gap-4 justify-between">
                <Link href="/docs/how-to-lend" className="group flex flex-col items-start p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Previous</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        How to Lend
                    </div>
                </Link>
                <Link href="/docs/collateral" className="group flex flex-col items-end p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2 text-right">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Next</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        Collateral
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            </div>
        </>
    );
}
