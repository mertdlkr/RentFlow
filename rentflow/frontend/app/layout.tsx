import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "RentFlow - Collateral-Free NFT Rentals",
  description: "Rent GameFi items without collateral on Sui Network",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, orbitron.variable, "min-h-screen bg-background font-body antialiased text-foreground overflow-x-hidden")}>
        <Providers>
          <Navbar />
          <main className="pt-20 pb-0 min-h-screen">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
