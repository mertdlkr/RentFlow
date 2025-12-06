import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CollateralPage() {
    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 font-mono">
                <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-gray-500">User Guides</span>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-primary">Collateral</span>
            </nav>

            <section className="mb-20">
                <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    Collateral-Free Protocol
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                    RentFlow uses a unique "Wrapped RentPass" mechanism. The original NFT is held securely in the smart contract, while the renter receives a temporary RentPass. This eliminates the need for collateral, as the renter never takes custody of the original asset, only the right to use it.
                </p>
            </section>

            <div className="border-t border-white/10 pt-10 mt-16 flex flex-col md:flex-row gap-4 justify-between">
                <Link href="/docs/how-to-rent" className="group flex flex-col items-start p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Previous</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        How to Rent
                    </div>
                </Link>
                <Link href="/docs/smart-contracts" className="group flex flex-col items-end p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2 text-right">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Next</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        Smart Contracts
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            </div>
        </>
    );
}
