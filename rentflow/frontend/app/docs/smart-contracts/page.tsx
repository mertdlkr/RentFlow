import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SmartContractsPage() {
    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 font-mono">
                <Link href="/docs" className="hover:text-primary transition-colors">Docs</Link>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-gray-500">Developers</span>
                <span className="mx-2 text-gray-700">/</span>
                <span className="text-primary">Smart Contracts</span>
            </nav>

            <section className="mb-20">
                <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    Smart Contracts
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                    Our contracts are written in Move and deployed on the Sui Network.
                </p>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-6 shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                        <span className="text-xs font-mono text-gray-400">market.move</span>
                    </div>
                    <div className="p-6 overflow-x-auto font-mono text-sm leading-relaxed">
                        <pre className="text-gray-300">
                            <span className="text-secondary">module</span> <span className="text-primary">rentflow::market</span> {"{"}<br />
                            {"    "}<span className="text-secondary">struct</span> <span className="text-primary">Listing</span>&lt;T: key + store&gt; <span className="text-secondary">has</span> key, store {"{"}<br />
                            {"        "}id: UID,<br />
                            {"        "}owner: address,<br />
                            {"        "}price_per_day: u64,<br />
                            {"        "}...<br />
                            {"    "}<br />
                            {"    "}<span className="text-secondary">public entry fun</span> <span className="text-primary">rent_item</span>(...) {"{"}<br />
                            {"        "}// Logic for zero-collateral rental<br />
                            {"    "}<br />
                            {"}"}
                        </pre>
                    </div>
                </div>
            </section>

            <div className="border-t border-white/10 pt-10 mt-16 flex flex-col md:flex-row gap-4 justify-between">
                <Link href="/docs/collateral" className="group flex flex-col items-start p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Previous</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Collateral
                    </div>
                </Link>
                <Link href="/docs/api-reference" className="group flex flex-col items-end p-4 rounded-xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all w-full md:w-1/2 text-right">
                    <span className="text-xs text-gray-500 font-mono mb-2 group-hover:text-primary transition-colors">Next</span>
                    <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                        API Reference
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            </div>
        </>
    );
}
