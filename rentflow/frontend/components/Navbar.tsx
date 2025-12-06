"use client";

import Link from "next/link";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { ADMIN_ADDRESS } from "@/utils/config";

export function Navbar() {
    const account = useCurrentAccount();
    const isAdmin = account?.address === ADMIN_ADDRESS;

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-glass-border bg-[#050510]/30 backdrop-blur-md">
            <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative size-10 transition-transform group-hover:scale-110">
                        <img src="/logo.png" alt="RentFlow Logo" className="object-contain w-full h-full drop-shadow-[0_0_8px_rgba(0,238,255,0.8)]" />
                    </div>
                    <h2 className="font-display text-2xl font-bold tracking-wider text-white drop-shadow-md group-hover:text-primary transition-colors">RentFlow</h2>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    <Link href="/market" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors tracking-wide uppercase">
                        Marketplace
                    </Link>
                    <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors tracking-wide uppercase">
                        Dashboard
                    </Link>
                    {isAdmin && (
                        <Link href="/admin" className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors tracking-wide uppercase">
                            Admin
                        </Link>
                    )}
                    <Link href="/docs" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors tracking-wide uppercase">
                        Docs
                    </Link>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
                        <div className="relative">
                            <ConnectButton className="!bg-black !text-white !font-display !font-bold !uppercase !tracking-wider !border !border-primary/50 !rounded-lg hover:!bg-primary/10 transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
