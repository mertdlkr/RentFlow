"use client";

import { GradientCard } from "@/components/GradientCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRentFlow } from "@/hooks/useRentFlow";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "@/utils/config";
import { useState } from "react";

export default function DashboardPage() {
    const { listItem, mintDummyNft, account } = useRentFlow();
    const [price, setPrice] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const { data: ownedObjects, refetch } = useSuiClientQuery(
        "getOwnedObjects",
        {
            owner: account?.address || "",
            filter: {
                StructType: `${PACKAGE_ID}::market::GameItem`,
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

    const handleList = () => {
        if (!account || !selectedItem) return;
        if (!price) {
            alert("Please enter a price");
            return;
        }
        listItem(selectedItem.data.objectId, Number(price));
        setSelectedItem(null);
        setPrice("");
        // Refetch after a delay to allow transaction to process
        setTimeout(() => refetch(), 2000);
    };

    const handleMint = () => {
        if (!account) {
            alert("Please connect your wallet first");
            return;
        }
        mintDummyNft("Void Slayer", "A legendary sword forged in the void.", "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop");
        setTimeout(() => refetch(), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your assets and rentals.
                        </p>
                    </div>
                    <Button onClick={handleMint} variant="outline">Mint Test NFT</Button>
                </div>
            </div>

            <Tabs defaultValue="wallet" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
                    <TabsTrigger value="wallet">My Wallet</TabsTrigger>
                    <TabsTrigger value="rentals">My Rentals</TabsTrigger>
                </TabsList>

                <TabsContent value="wallet">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ownedObjects?.data.map((obj: any) => {
                            const content = obj.data?.content?.fields;
                            return (
                                <GradientCard key={obj.data?.objectId} className="h-full flex flex-col">
                                    <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-muted">
                                        {/* Use a placeholder if url is bytes or invalid, for now assuming string or bytes */}
                                        {/* In Move we used vector<u8>, so it comes as bytes usually, but display might handle it if we had display standard. 
                                            For this hackathon, we passed string bytes. We need to decode if it's not a string. 
                                            Actually, dapp-kit might show it as string if it's a string type in Move, but we used vector<u8>.
                                            Let's try to render the image if it's a valid URL string, otherwise placeholder.
                                        */}
                                        <Image
                                            src={content?.url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"}
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
                                                        Set the daily rental price for this item.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Input
                                                            id="price"
                                                            placeholder="Price per day (SUI)"
                                                            className="col-span-4"
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                        />
                                                    </div>
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
                            <div className="col-span-full text-center py-10 text-muted-foreground">
                                No items found. Mint a test NFT to get started!
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="rentals">
                    <div className="text-center py-10 text-muted-foreground">
                        Active rentals will appear here.
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
