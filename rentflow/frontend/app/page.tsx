"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, ArrowUpRight, Unlock, Zap, TrendingUp } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="relative min-h-screen w-full flex flex-col">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Main Background Image with Overlay */}
                <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-40 mix-blend-color-dodge"></div>
                {/* Gradient Overlay for darkening */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/80 via-[#050510]/90 to-[#050510]"></div>
                {/* Decorative Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            {/* Main Content Area */}
            <main className="relative z-10 flex-grow flex flex-col justify-center pt-10 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Hero Section */}
                    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-widest text-secondary font-display">Live on Sui Testnet</span>
                        </motion.div>

                        {/* Headline */}
                        <div className="relative">
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 0.5, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mix-blend-overlay absolute top-1 left-1 w-full select-none blur-[1px]"
                            >
                                Own the Gameplay, <br /> Not the Asset.
                            </motion.h1>
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative font-display text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 leading-[0.9] tracking-tighter drop-shadow-2xl"
                            >
                                Own the Gameplay, <br /> Not the Asset.
                            </motion.h1>
                        </div>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-2xl text-lg md:text-xl text-gray-400 font-light leading-relaxed"
                        >
                            The first collateral-free NFT rental protocol powering the next generation of <span className="text-white font-medium">GameFi</span> on Sui. Rent assets instantly, zero capital lockup.
                            <br />
                            <span className="text-white font-medium block mt-2">Play more, pay less.</span>
                        </motion.p>

                        {/* Hero Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-5 mt-4"
                        >
                            <Link href="/market">
                                <button className="h-14 min-w-[180px] rounded bg-primary text-black font-display font-bold text-lg tracking-wide hover:bg-[#33f2ff] hover:scale-105 transition-all shadow-neon flex items-center justify-center gap-2">
                                    Launch App
                                    <Rocket className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/docs">
                                <button className="h-14 min-w-[180px] rounded border border-glass-border bg-glass-bg backdrop-blur-md text-white font-display font-bold text-lg tracking-wide hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2">
                                    Learn More
                                    <ArrowUpRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Trusted By Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-24 mb-10 flex flex-col items-center gap-8"
                    >
                        <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Trusted by Next-Gen Games</span>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-2xl md:text-3xl font-display font-bold text-white/80 hover:text-white transition-colors cursor-default">PROJECT: E4C</span>
                            <span className="text-2xl md:text-3xl font-display font-bold text-white/80 hover:text-white transition-colors cursor-default">ABYSS WORLD</span>
                            <span className="text-2xl md:text-3xl font-display font-bold text-white/80 hover:text-white transition-colors cursor-default">COSMOCADIA</span>
                            <span className="text-2xl md:text-3xl font-display font-bold text-white/80 hover:text-white transition-colors cursor-default">SUIA</span>
                        </div>
                    </motion.div>

                    {/* Features Section */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative rounded-xl border border-glass-border bg-glass-bg backdrop-blur-md p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-neon duration-300"
                        >
                            <div className="mb-5 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                                <Unlock className="w-8 h-8" />
                            </div>
                            <h3 className="mb-3 font-display text-xl font-bold text-white uppercase tracking-wide">No Collateral</h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">Rent expensive high-tier gaming assets without locking up massive capital. Pure utility, zero risk.</p>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative rounded-xl border border-glass-border bg-glass-bg backdrop-blur-md p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-neon duration-300"
                        >
                            <div className="mb-5 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="mb-3 font-display text-xl font-bold text-white uppercase tracking-wide">Instant Access</h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">Start gaming immediately. Our smart contracts handle asset delegation in seconds with zero wait times.</p>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="group relative rounded-xl border border-glass-border bg-glass-bg backdrop-blur-md p-8 transition-all hover:-translate-y-1 hover:border-secondary/50 hover:shadow-neon-purple duration-300"
                        >
                            <div className="mb-5 inline-flex items-center justify-center rounded-lg bg-secondary/10 p-3 text-secondary group-hover:text-white group-hover:bg-secondary transition-colors">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <h3 className="mb-3 font-display text-xl font-bold text-white uppercase tracking-wide">Yield Generation</h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-light">Lenders earn passive income on idle NFTs. Put your inventory to work while retaining ownership.</p>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                        </motion.div>
                    </div>
                </div>
            </main >

            {/* Live Ticker Footer */}
            < div className="fixed bottom-0 left-0 w-full z-40 border-t border-glass-border bg-[#050510]/90 backdrop-blur-xl h-12 flex items-center overflow-hidden" >
                <div className="flex items-center gap-2 px-4 border-r border-glass-border h-full bg-black/40 z-10 relative">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap font-display">Live Activity</span>
                </div>
                <div className="flex-1 overflow-hidden relative">
                    <div className="flex whitespace-nowrap min-w-full animate-marquee hover:[animation-play-state:paused]">
                        <div className="flex items-center gap-12 px-6 text-sm text-gray-400 font-mono">
                            <span className="flex items-center gap-2">
                                <span className="text-primary">⚡ TX 0x...8a12</span>
                                rented
                                <span className="text-white font-bold">Sword of Arak</span>
                                <span className="text-xs text-gray-500">| 500 SUI APY</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-secondary">💰 TX 0x...b29f</span>
                                rented
                                <span className="text-white font-bold">Cyberpunk Visor Lvl.3</span>
                                <span className="text-xs text-gray-500">| 200 SUI APY</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-primary">🎮 TX 0x...c44d</span>
                                listed
                                <span className="text-white font-bold">Mech Suit Genesis</span>
                                <span className="text-xs text-gray-500">| 1200 SUI APY</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-secondary">🔥 TX 0x...f11e</span>
                                rented
                                <span className="text-white font-bold">Plasma Rifle</span>
                                <span className="text-xs text-gray-500">| 350 SUI APY</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-primary">⚡ TX 0x...9c21</span>
                                rented
                                <span className="text-white font-bold">Neon Katana</span>
                                <span className="text-xs text-gray-500">| 450 SUI APY</span>
                            </span>
                        </div>
                        {/* Duplicate for seamless scrolling */}
                        <div className="flex items-center gap-12 px-6 text-sm text-gray-400 font-mono">
                            <span className="flex items-center gap-2">
                                <span className="text-primary">⚡ TX 0x...8a12</span>
                                rented
                                <span className="text-white font-bold">Sword of Arak</span>
                                <span className="text-xs text-gray-500">| 500 SUI APY</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-secondary">💰 TX 0x...b29f</span>
                                rented
                                <span className="text-white font-bold">Cyberpunk Visor Lvl.3</span>
                                <span className="text-xs text-gray-500">| 200 SUI APY</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-primary">🎮 TX 0x...c44d</span>
                                listed
                                <span className="text-white font-bold">Mech Suit Genesis</span>
                                <span className="text-xs text-gray-500">| 1200 SUI APY</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-secondary">🔥 TX 0x...f11e</span>
                                rented
                                <span className="text-white font-bold">Plasma Rifle</span>
                                <span className="text-xs text-gray-500">| 350 SUI APY</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-primary">⚡ TX 0x...9c21</span>
                                rented
                                <span className="text-white font-bold">Neon Katana</span>
                                <span className="text-xs text-gray-500">| 450 SUI APY</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
