"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
    min: number;
    max: number;
    step?: number;
    value: [number, number];
    onValueChange: (value: [number, number]) => void;
    className?: string;
}

export function Slider({ min, max, step = 1, value, onValueChange, className }: SliderProps) {
    const [isDragging, setIsDragging] = React.useState<"min" | "max" | null>(null);
    const sliderRef = React.useRef<HTMLDivElement>(null);

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

    const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(thumb);
    };

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !sliderRef.current) return;

            const rect = sliderRef.current.getBoundingClientRect();
            const percentage = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
            const rawValue = percentage * (max - min) + min;
            const steppedValue = Math.round(rawValue / step) * step;

            if (isDragging === "min") {
                const newValue = Math.min(steppedValue, value[1] - step);
                if (newValue >= min) onValueChange([newValue, value[1]]);
            } else {
                const newValue = Math.max(steppedValue, value[0] + step);
                if (newValue <= max) onValueChange([value[0], newValue]);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(null);
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, min, max, step, value, onValueChange]);

    return (
        <div className={cn("relative flex items-center w-full h-5 touch-none select-none", className)} ref={sliderRef}>
            <div className="relative h-1 w-full bg-[#27393a] rounded-full">
                <div
                    className="absolute h-full bg-primary rounded-full"
                    style={{
                        left: `${getPercentage(value[0])}%`,
                        right: `${100 - getPercentage(value[1])}%`,
                    }}
                />
            </div>
            <div
                className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-pointer hover:scale-110 transition-transform"
                style={{ left: `calc(${getPercentage(value[0])}% - 8px)` }}
                onMouseDown={handleMouseDown("min")}
            />
            <div
                className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-pointer hover:scale-110 transition-transform"
                style={{ left: `calc(${getPercentage(value[1])}% - 8px)` }}
                onMouseDown={handleMouseDown("max")}
            />
        </div>
    );
}
