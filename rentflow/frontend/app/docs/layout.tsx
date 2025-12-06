"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Rocket,
    Coins,
    Handshake,
    ShoppingBag,
    Shield,
    Code,
    Terminal,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex min-h-screen pt-20 max-w-[1440px] mx-auto">
            {/* Left Sidebar Navigation */}
            <aside className="hidden lg:block w-72 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto border-r border-white/5 bg-background/30 backdrop-blur-sm pb-10">
                <div className="p-6">
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Documentation</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/docs"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                                        isActive("/docs")
                                            ? "text-white bg-surface-dark border border-glass-border shadow-lg shadow-black/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Home className={cn("w-5 h-5 transition-colors", isActive("/docs") ? "text-primary" : "group-hover:text-primary")} />
                                    <span className="text-sm font-medium">Introduction</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 px-2">Getting Started</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/docs/wallet-setup"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                                        isActive("/docs/wallet-setup")
                                            ? "text-white bg-surface-dark border border-glass-border shadow-lg shadow-black/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Rocket className={cn("w-5 h-5 transition-colors", isActive("/docs/wallet-setup") ? "text-primary" : "group-hover:text-primary")} />
                                    <span className="text-sm font-medium">Wallet Setup</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/docs/get-sui-tokens"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                                        isActive("/docs/get-sui-tokens")
                                            ? "text-white bg-surface-dark border border-glass-border shadow-lg shadow-black/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Coins className={cn("w-5 h-5 transition-colors", isActive("/docs/get-sui-tokens") ? "text-primary" : "group-hover:text-primary")} />
                                    <span className="text-sm font-medium">Get SUI Tokens</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">User Guides</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/docs/how-to-lend"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                                        isActive("/docs/how-to-lend")
                                            ? "text-white bg-surface-dark border border-glass-border shadow-lg shadow-black/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Handshake className={cn("w-5 h-5 transition-colors", isActive("/docs/how-to-lend") ? "text-primary" : "group-hover:text-primary")} />
                                    <span className="text-sm font-medium">How to Lend</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/docs/how-to-rent"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                                        isActive("/docs/how-to-rent")
                                            ? "text-white bg-surface-dark border border-glass-border shadow-lg shadow-black/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <ShoppingBag className={cn("w-5 h-5 transition-colors", isActive("/docs/how-to-rent") ? "text-primary" : "group-hover:text-primary")} />
                                    <span className="text-sm font-medium">How to Rent</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/docs/collateral"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                                        isActive("/docs/collateral")
                                            ? "text-white bg-surface-dark border border-glass-border shadow-lg shadow-black/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Shield className={cn("w-5 h-5 transition-colors", isActive("/docs/collateral") ? "text-primary" : "group-hover:text-primary")} />
                                    <span className="text-sm font-medium">Collateral</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Developers</h3>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    href="/docs/smart-contracts"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                                        isActive("/docs/smart-contracts")
                                            ? "text-white bg-surface-dark border border-glass-border shadow-lg shadow-black/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Code className={cn("w-5 h-5 transition-colors", isActive("/docs/smart-contracts") ? "text-primary" : "group-hover:text-primary")} />
                                    <span className="text-sm font-medium">Smart Contracts</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/docs/api-reference"
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                                        isActive("/docs/api-reference")
                                            ? "text-white bg-surface-dark border border-glass-border shadow-lg shadow-black/20"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Terminal className={cn("w-5 h-5 transition-colors", isActive("/docs/api-reference") ? "text-primary" : "group-hover:text-primary")} />
                                    <span className="text-sm font-medium">API Reference</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 py-10 px-6 lg:px-12 xl:px-16 overflow-y-auto scroll-smooth">
                <div className="max-w-3xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Right Sidebar (Table of Contents) - Can be made dynamic or static per page if needed, for now keeping static or we can move it to individual pages if they have different TOCs. 
                Actually, usually TOC is specific to the page content. I will leave it out of layout for now and let individual pages handle their specific TOC or right sidebar if needed, 
                OR I can make it a slot. But for simplicity and since the user asked for separate pages, I'll put the TOC in the individual pages if they are long enough. 
                However, the previous design had a fixed right sidebar. 
                Let's keep the layout simple: Sidebar + Content. The Right Sidebar was part of the page content in the previous file.
            */}
            <aside className="hidden xl:block w-64 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto py-10 pr-8">
                <div className="border-l border-white/10 pl-6">
                    <div className="mt-10 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 text-center">
                        <MessageSquare className="w-6 h-6 text-white mx-auto mb-2" />
                        <p className="text-xs text-gray-300 mb-3">Need help setting up?</p>
                        <button className="inline-flex items-center justify-center text-xs font-bold text-black bg-white px-3 py-2 rounded hover:bg-gray-200 transition-colors w-full">
                            Join Discord
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}
