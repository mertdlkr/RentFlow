import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                foreground: '#ededed',
                primary: {
                    DEFAULT: '#8b5cf6', // Violet 500
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#3b82f6', // Blue 500
                    foreground: '#ffffff',
                },
                card: {
                    DEFAULT: 'rgba(255, 255, 255, 0.05)',
                    foreground: '#ededed',
                },
                popover: {
                    DEFAULT: '#171717',
                    foreground: '#ededed',
                },
                muted: {
                    DEFAULT: '#262626',
                    foreground: '#a3a3a3',
                },
                accent: {
                    DEFAULT: '#262626',
                    foreground: '#ededed',
                },
                destructive: {
                    DEFAULT: '#ef4444',
                    foreground: '#ffffff',
                },
                border: '#262626',
                input: '#262626',
                ring: '#8b5cf6',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
