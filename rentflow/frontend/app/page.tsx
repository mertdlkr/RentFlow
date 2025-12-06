"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Coins } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* HERO SECTION */}
            <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop"
                        alt="Cyberpunk City"
                        className="w-full h-full object-cover"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-20 max-w-4xl"
                >
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-tight">
                        Own the Gameplay, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
                            Not the Asset.
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
                        The first Collateral-Free NFT Rental Protocol on Sui. <br />
                        Zero risk, 100% utility. Play more, pay less.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/market">
                            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all bg-primary hover:bg-primary/90">
                                Start Renting <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* TICKER TAPE */}
            <div className="bg-primary/10 border-y border-primary/20 py-3 overflow-hidden whitespace-nowrap relative">
                <motion.div
                    className="inline-block"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    <span className="mx-8 text-primary font-mono">⚡ User 0x8a2...3f1 rented Abyssal Blade</span>
                    <span className="mx-8 text-secondary font-mono">💰 User 0xb1f...9a2 earned 50 SUI</span>
                    <span className="mx-8 text-primary font-mono">🎮 New Listing: Void Slayer just added</span>
                    <span className="mx-8 text-secondary font-mono">🔥 Trending: CyberKatana is hot!</span>
                    <span className="mx-8 text-primary font-mono">⚡ User 0x7c3...1b4 rented Neon Shield</span>
                </motion.div>
            </div>

            {/* SOCIAL PROOF */}
            <section className="py-16 bg-black/50">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-8">Trusted by Next-Gen Games</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                        <h3 className="text-2xl font-bold font-mono">PROJECT: E4C</h3>
                        <h3 className="text-2xl font-bold font-mono">ABYSS WORLD</h3>
                        <h3 className="text-2xl font-bold font-mono">COSMOCADIA</h3>
                        <h3 className="text-2xl font-bold font-mono">SUIA</h3>
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<ShieldCheck size={40} className="text-primary" />}
                            title="Zero Collateral"
                            description="Rent high-value assets without locking up huge capital. Our wrapping protocol ensures safety for lenders."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Zap size={40} className="text-secondary" />}
                            title="Instant Access"
                            description="Get immediate access to in-game items. No waiting periods, no complex approvals. Just rent and play."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon={<Coins size={40} className="text-purple-400" />}
                            title="Passive Yield"
                            description="Turn your idle GameFi assets into revenue streams. List your items and earn SUI while you sleep."
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
        >
            <div className="mb-6 p-4 bg-black/40 rounded-xl w-fit">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
