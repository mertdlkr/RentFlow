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
import { parseMoveString } from "@/utils/format";
import { useState } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Wallet, Key, DollarSign, ArrowUpRight } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DashboardPage() {
    const { listItem, mintDummyNft, withdrawItem, terminateRental, claimEarnings, account } = useRentFlow();
    const { listings, isLoading: isLoadingListings, refetch: refetchListings } = useListings();
    const [price, setPrice] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    // 3. Filter My Listings (Case Insensitive)
    const myListings = listings.filter((l: any) => {
        const isMatch = l.owner.toLowerCase() === account?.address?.toLowerCase();
        // console.log(`Listing ${l.id} Owner: ${l.owner}, My Address: ${account?.address}, Match: ${isMatch}`);
        return isMatch;
    });

    // 4. Calculate Total Earnings
    const totalEarnings = myListings.reduce((acc: number, curr: any) => {
        const val = Number(curr.balance) || 0;
        // console.log(`Listing ${curr.id} Balance: ${curr.balance} -> ${val}`);
        return acc + val;
    }, 0);

    // console.log("Total Earnings:", totalEarnings);

    const formattedEarnings = (totalEarnings / 1_000_000_000).toFixed(3);

    const handleClaimEarnings = () => {
        // Claim from all listings with balance > 0
        const listingsWithBalance = myListings.filter((l: any) => Number(l.balance) > 0);
        if (listingsWithBalance.length === 0) {
            alert("No earnings to claim.");
            return;
        }

        // For simplicity, just claim from the first one or loop? 
        // Move calls are 1 by 1 usually unless batched.
        // Let's just claim from the first one for now, or better, make the user claim per listing?
        // The UI shows "Total Earnings". A "Claim All" would be nice but requires PTB.
        // Let's just claim the first one found for now to demonstrate.
        // Ideally we should have a "Claim" button on each listing card.

        // Actually, let's just claim the first one for this hackathon scope if multiple exist.
        const target = listingsWithBalance[0];

        if (!target) return;

        claimEarnings(target.id, () => {
            setTimeout(() => {
                refetchListings();
                refetchWallet();
            }, 1000);
        });
    };

    const handleList = () => {
        if (!account || !selectedItem) return;
        if (!price) {
            alert("Please enter a price");
            return;
        }
        listItem(selectedItem.data.objectId, Number(price) * 1_000_000_000, () => {
            setTimeout(() => {
                refetchWallet();
                refetchListings();
            }, 1000);
        });
        setSelectedItem(null);
        setPrice("");
        setIsDialogOpen(false); // Close dialog
    };

    const handleMint = () => {
        if (!account) {
            alert("Please connect your wallet first");
            return;
        }
        mintDummyNft(
            "Void Slayer",
            "A legendary sword forged in the void.",
            "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop",
            () => {
                setTimeout(() => {
                    refetchWallet();
                }, 1000);
            }
        );
    };

    const handleWithdraw = (listingId: string) => {
        withdrawItem(listingId, () => {
            setTimeout(() => {
                refetchWallet();
                refetchListings();
            }, 1000);
        });
    };

    const handleTerminate = (rentPassId: string, listingId: string) => {
        terminateRental(rentPassId, listingId, () => {
            setTimeout(() => {
                refetchRentals();
                refetchListings();
            }, 1000);
        });
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
                            <p className="text-2xl font-bold">{formattedEarnings} SUI</p>
                        </div>
                        <Button size="sm" onClick={handleClaimEarnings} disabled={totalEarnings === 0}>
                            Claim
                        </Button>
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
                                const name = parseMoveString(content?.name) || "Unknown Item";
                                const url = parseMoveString(content?.url);
                                const image = url.length > 0 ? url : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop";

                                return (
                                    <GradientCard key={obj.data?.objectId} className="h-full flex flex-col">
                                        <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-muted">
                                            <Image
                                                src={image}
                                                alt={name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <CardHeader className="p-0 mb-4">
                                            <CardTitle className="text-xl">{name}</CardTitle>
                                            <CardDescription className="line-clamp-2 mt-2">
                                                {parseMoveString(content?.description) || "No description"}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-0 pt-4 mt-auto">
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        className="w-full"
                                                        variant="secondary"
                                                        onClick={() => {
                                                            setSelectedItem(obj);
                                                            setIsDialogOpen(true);
                                                        }}
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
                                const validUntil = Number(content?.valid_until);
                                const listingId = content?.listing_id;

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
                                                Listing ID: {String(listingId).slice(0, 8)}...
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-0 pt-4 mt-auto flex flex-col gap-2">
                                            <Button className="w-full" disabled>
                                                Access Content (Coming Soon)
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        className="w-full"
                                                        variant="destructive"
                                                    >
                                                        Terminate Rental (Refund)
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Terminate Rental Early?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to terminate this rental? You will receive a partial refund based on the remaining time.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleTerminate(obj.data.objectId, listingId)}>
                                                            Confirm Termination
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
