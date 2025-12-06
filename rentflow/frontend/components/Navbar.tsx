"use client";

import Link from "next/link";
import { ConnectButton } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="RentFlow Logo" className="h-10 w-auto" />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        RentFlow
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/market" className="text-sm font-medium hover:text-primary transition-colors">
                        Marketplace
                    </Link>
                    <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                        Dashboard
                    </Link>
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
}
