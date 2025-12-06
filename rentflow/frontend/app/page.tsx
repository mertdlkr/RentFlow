"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
                        RentFlow
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    The collateral-free NFT rental protocol for the Sui Network.
                    <br />
                    <span className="text-primary">Play more, pay less.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/market">
                        <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all">
                            Explore Marketplace
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-primary/50 hover:bg-primary/10">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 h-[50vh] -z-10 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        </div>
    );
}
