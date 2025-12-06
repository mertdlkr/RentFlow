"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps {
    children: ReactNode;
    className?: string;
}

export function GradientCard({ children, className }: GradientCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "relative p-[1px] rounded-xl overflow-hidden bg-gradient-to-br from-primary/50 via-background to-secondary/50",
                className
            )}
        >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
            <div className="relative h-full w-full bg-background/40 rounded-xl p-4">
                {children}
            </div>
        </motion.div>
    );
}
