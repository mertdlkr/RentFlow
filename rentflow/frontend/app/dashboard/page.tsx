"use client";

import { GradientCard } from "@/components/GradientCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRentFlow } from "@/hooks/useRentFlow";
import { useListings } from "@/hooks/useListings";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { PACKAGE_ID, MARKET_MODULE } from "@/utils/config";
import { useState } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Wallet, Key, DollarSign, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
    const { listItem, mintDummyNft, withdrawItem, account } = useRentFlow();
    const { listings, isLoading: isLoadingListings } = useListings();
    const [price, setPrice] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // 1. Fetch Owned Items (Wallet)
    const { data: ownedObjects, refetch: refetchWallet } = useSuiClientQuery(
        "getOwnedObjects",
        {
            owner: account?.address || "",
            filter: {
                StructType: `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`,
            },
            options: {
                showContent: true,
                showDisplay: true,
            },
        },
        {
            enabled: !!account,
        }
    );

    // 2. Fetch Active Rentals (RentPass)
    const { data: rentPasses, refetch: refetchRentals } = useSuiClientQuery(
        "getOwnedObjects",
        {
            owner: account?.address || "",
            filter: {
                StructType: `${PACKAGE_ID}::${MARKET_MODULE}::RentPass`,
            },
            options: {
                showContent: true,
                showDisplay: true,
            },
        },
        {
            enabled: !!account,
        }
    );

    // 3. Filter My Listings
    const myListings = listings.filter((l: any) => l.owner === account?.address);

    const handleList = () => {
        if (!account || !selectedItem) return;
        if (!price) {
            alert("Please enter a price");
            return;
        }
        listItem(selectedItem.data.objectId, Number(price) * 1_000_000_000); // Convert to MIST? No, usually UI inputs SUI.
        // Wait, the contract expects u64. If we input "1" SUI, we should send 1_000_000_000.
        // Let's assume input is SUI.
        setSelectedItem(null);
        setPrice("");
        setTimeout(() => { refetchWallet(); }, 2000);
    };

    const handleMint = () => {
        if (!account) {
            alert("Please connect your wallet first");
            return;
        }
        mintDummyNft("Void Slayer", "A legendary sword forged in the void.", "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop");
        setTimeout(() => { refetchWallet(); }, 2000);
    };

    const handleWithdraw = (listingId: string) => {
        withdrawItem(listingId);
        // Optimistic update?
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header & Earnings */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your assets, listings, and active rentals.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-4 shadow-lg">
                        <div className="p-3 bg-primary/20 rounded-full text-primary">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Earnings</p>
                            <p className="text-2xl font-bold">0.00 SUI</p>
                        </div>
                    </div>
                    <Button onClick={handleMint} variant="outline" className="h-auto py-4 px-6 border-primary/50 hover:bg-primary/10">
                        Mint Test NFT
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="lender" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8 bg-muted/50 p-1">
                    <TabsTrigger value="lender" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                        <Wallet className="w-4 h-4 mr-2" /> Lender View
                    </TabsTrigger>
                    <TabsTrigger value="renter" className="data-[state=active]:bg-background data-[state=active]:text-secondary data-[state=active]:shadow-sm">
                        <Key className="w-4 h-4 mr-2" /> Renter View
                    </TabsTrigger>
                </TabsList>

                {/* LENDER VIEW */}
                <TabsContent value="lender" className="space-y-10">

                    {/* My Wallet Items */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <Wallet className="text-primary" /> My Wallet Items
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ownedObjects?.data.map((obj: any) => {
                                const content = obj.data?.content?.fields;
                                return (
                                    <GradientCard key={obj.data?.objectId} className="h-full flex flex-col">
                                        <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-muted">
                                            <Image
                                                src={(typeof content?.url === "string" && content.url.length > 0) ? content.url : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"}
                                                alt={content?.name || "Item"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <CardHeader className="p-0 mb-4">
                                            <CardTitle className="text-xl">{content?.name || "Unknown Item"}</CardTitle>
                                            <CardDescription className="line-clamp-2 mt-2">
                                                {content?.description || "No description"}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-0 pt-4 mt-auto">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        className="w-full"
                                                        variant="secondary"
                                                        onClick={() => setSelectedItem(obj)}
                                                    >
                                                        List for Rent
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>List Item for Rent</DialogTitle>
                                                        <DialogDescription>
                                                            Set the daily rental price (SUI).
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <Input
                                                            type="number"
                                                            placeholder="Price per day (SUI)"
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                        />
                                                    </div>
                                                    <DialogFooter>
                                                        <Button onClick={handleList}>Confirm Listing</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </CardFooter>
                                    </GradientCard>
                                );
                            })}
                            {(!ownedObjects?.data || ownedObjects.data.length === 0) && (
                                <div className="col-span-full text-center py-10 border border-dashed border-muted-foreground/20 rounded-xl">
                                    <p className="text-muted-foreground">No items in wallet. Mint a test NFT!</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* My Active Listings */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <ArrowUpRight className="text-green-500" /> My Active Listings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myListings.map((listing: any) => (
                                <GradientCard key={listing.id} className="h-full flex flex-col border-primary/20">
                                    <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-muted">
                                        <Image
                                            src={listing.image}
                                            alt={listing.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {listing.isRented && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <span className="text-white font-bold text-xl border-2 border-white px-4 py-2 rounded-md transform -rotate-12">
                                                    RENTED
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <CardHeader className="p-0 mb-4">
                                        <CardTitle className="text-xl">{listing.name}</CardTitle>
                                        <CardDescription>
                                            Price: {Number(listing.price) / 1_000_000_000} SUI / Day
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="p-0 pt-4 mt-auto">
                                        <Button
                                            className="w-full"
                                            variant="destructive"
                                            disabled={listing.isRented}
                                            onClick={() => handleWithdraw(listing.id)}
                                        >
                                            {listing.isRented ? "Cannot Withdraw (Rented)" : "Withdraw Listing"}
                                        </Button>
                                    </CardFooter>
                                </GradientCard>
                            ))}
                            {myListings.length === 0 && (
                                <div className="col-span-full text-center py-10 border border-dashed border-muted-foreground/20 rounded-xl">
                                    <p className="text-muted-foreground">You haven't listed any items yet.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </TabsContent>

                {/* RENTER VIEW */}
                <TabsContent value="renter">
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <Key className="text-secondary" /> My Active Rentals
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rentPasses?.data.map((obj: any) => {
                                const content = obj.data?.content?.fields;
                                // RentPass has listing_id and valid_until.
                                // It doesn't have name/image directly. Ideally we fetch the listing details.
                                // For hackathon, we can try to match with listings or show generic info.
                                // Or we can assume we can fetch the listing object if we had time.
                                // Let's show the valid_until and a placeholder.
                                const validUntil = Number(content?.valid_until);

                                return (
                                    <GradientCard key={obj.data?.objectId} className="h-full flex flex-col border-secondary/20">
                                        <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-muted">
                                            <Image
                                                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop"
                                                alt="Rented Item"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 text-center">
                                                <CountdownTimer targetDate={validUntil} />
                                            </div>
                                        </div>
                                        <CardHeader className="p-0 mb-4">
                                            <CardTitle className="text-xl">Rented Access Pass</CardTitle>
                                            <CardDescription className="mt-2">
                                                Listing ID: {String(content?.listing_id).slice(0, 8)}...
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-0 pt-4 mt-auto">
                                            <Button className="w-full" disabled>
                                                Access Content (Coming Soon)
                                            </Button>
                                        </CardFooter>
                                    </GradientCard>
                                );
                            })}
                            {(!rentPasses?.data || rentPasses.data.length === 0) && (
                                <div className="col-span-full text-center py-10 border border-dashed border-muted-foreground/20 rounded-xl">
                                    <p className="text-muted-foreground">You are not renting any items.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </TabsContent>
            </Tabs>
        </div>
    );
}
