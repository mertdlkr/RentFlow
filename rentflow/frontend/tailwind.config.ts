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
                background: '#050510', // background-dark
                foreground: '#ffffff',
                primary: {
                    DEFAULT: '#00eeff', // Electric Neon Cyan
                    foreground: '#000000',
                },
                secondary: {
                    DEFAULT: '#bc13fe', // Deep Neon Purple
                    foreground: '#ffffff',
                },
                "glass-border": "rgba(255, 255, 255, 0.1)",
                "glass-bg": "rgba(255, 255, 255, 0.03)",
                card: {
                    DEFAULT: 'rgba(255, 255, 255, 0.03)',
                    foreground: '#ffffff',
                },
                popover: {
                    DEFAULT: '#050510',
                    foreground: '#ffffff',
                },
                muted: {
                    DEFAULT: 'rgba(255, 255, 255, 0.1)',
                    foreground: '#a3a3a3',
                },
                accent: {
                    DEFAULT: 'rgba(0, 238, 255, 0.1)',
                    foreground: '#00eeff',
                },
                destructive: {
                    DEFAULT: '#ef4444',
                    foreground: '#ffffff',
                },
                border: 'rgba(255, 255, 255, 0.1)',
                input: 'rgba(255, 255, 255, 0.1)',
                ring: '#00eeff',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                display: ['var(--font-orbitron)', 'sans-serif'],
                body: ['var(--font-inter)', 'sans-serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
            },
            boxShadow: {
                'neon': '0 0 10px rgba(0, 238, 255, 0.5), 0 0 20px rgba(0, 238, 255, 0.3)',
                'neon-purple': '0 0 10px rgba(188, 19, 254, 0.5), 0 0 20px rgba(188, 19, 254, 0.3)',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
