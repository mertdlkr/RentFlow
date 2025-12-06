"use client";

import { useSuiClientQuery, useCurrentAccount } from "@mysten/dapp-kit";
import { RENTAL_STORE_ID, PACKAGE_ID, MARKET_MODULE, ADMIN_ADDRESS } from "@/utils/config";
import { parseMoveString } from "@/utils/format";
import { GradientCard } from "@/components/GradientCard";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Lock } from "lucide-react";

export default function AdminPage() {
    const account = useCurrentAccount();

    // Fetch all dynamic fields (Listings) from the Marketplace
    const { data: dynamicFields, isLoading: isLoadingFields } = useSuiClientQuery(
        "getDynamicFields",
        {
            parentId: RENTAL_STORE_ID,
        }
    );

    // Fetch the actual Listing objects
    const fieldIds = dynamicFields?.data.map((field) => field.objectId) || [];
    const { data: listingObjects, isLoading: isLoadingObjects } = useSuiClientQuery(
        "multiGetObjects",
        {
            ids: fieldIds,
            options: {
                showContent: true,
                showDisplay: true,
            },
        },
        {
            enabled: fieldIds.length > 0,
        }
    );

    // Fetch Events for Transaction History
    const { data: eventsData, isLoading: isLoadingEvents } = useSuiClientQuery(
        "queryEvents",
        {
            query: {
                MoveModule: {
                    package: PACKAGE_ID,
                    module: MARKET_MODULE,
                },
            },
            order: "descending",
        }
    );

    if (!account || account.address !== ADMIN_ADDRESS) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-6 bg-red-500/10 rounded-full text-red-500">
                        <Lock size={48} />
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    You do not have permission to view this page. This area is restricted to the contract administrator.
                </p>
            </div>
        );
    }

    if (isLoadingFields || isLoadingObjects || isLoadingEvents) {
        return <div className="p-8 text-center">Loading Admin Panel...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 flex items-center gap-2">
                <ShieldAlert className="text-red-500" /> Admin Panel
            </h1>

            {/* Active Listings Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Active Listings & Rentals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listingObjects?.map((obj: any) => {
                        const listing = obj.data?.content?.fields;
                        if (!listing) return null;

                        const innerItem = listing.item?.fields || listing.item;
                        const realItem = innerItem?.vec ? innerItem.vec[0]?.fields : innerItem;
                        const name = parseMoveString(realItem?.name) || "Unknown Item";

                        const isRented = Number(listing.rented_until) > Date.now();
                        const rentedUntilDate = new Date(Number(listing.rented_until)).toLocaleString();

                        return (
                            <GradientCard key={obj.data?.objectId} className="border-red-500/20">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        {name}
                                        <Badge variant={isRented ? "destructive" : "secondary"}>
                                            {isRented ? "RENTED" : "AVAILABLE"}
                                        </Badge>
                                    </CardTitle>
                                    <CardDescription>
                                        Listing ID: {listing.id.id.slice(0, 8)}...
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <p><strong>Owner:</strong> {listing.owner.slice(0, 10)}...</p>
                                    <p><strong>Price:</strong> {Number(listing.price_per_day) / 1_000_000_000} SUI/Day</p>
                                    {isRented && (
                                        <p className="text-yellow-500">
                                            <strong>Rented Until:</strong> {rentedUntilDate}
                                        </p>
                                    )}
                                    <p><strong>Balance:</strong> {Number(listing.balance) / 1_000_000_000} SUI</p>
                                </CardContent>
                            </GradientCard>
                        );
                    })}
                </div>
            </section>

            {/* Transaction History Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>
                <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground uppercase">
                                <tr>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Sender (Wallet)</th>
                                    <th className="px-6 py-3">Details</th>
                                    <th className="px-6 py-3">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventsData?.data.map((event: any, index: number) => {
                                    const type = event.type.split("::").pop();
                                    const data = event.parsedJson;
                                    const time = new Date(Number(event.timestampMs)).toLocaleString();

                                    let details = "";
                                    let sender = "";

                                    if (type === "ListingCreated") {
                                        sender = data.owner;
                                        details = `Price: ${Number(data.price) / 1_000_000_000} SUI/Day`;
                                    } else if (type === "ItemRented") {
                                        sender = data.renter;
                                        details = `Rented for ${data.days} days. Total: ${Number(data.price) / 1_000_000_000} SUI`;
                                    } else if (type === "RentalTerminated") {
                                        sender = data.renter;
                                        details = `Refund: ${Number(data.refund) / 1_000_000_000} SUI`;
                                    } else if (type === "ItemWithdrawn") {
                                        sender = data.owner;
                                        details = "Item withdrawn from market";
                                    } else if (type === "EarningsClaimed") {
                                        sender = data.owner;
                                        details = `Claimed: ${Number(data.amount) / 1_000_000_000} SUI`;
                                    }

                                    return (
                                        <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                                            <td className="px-6 py-4 font-medium">
                                                <Badge variant="outline">{type}</Badge>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                                {sender}
                                            </td>
                                            <td className="px-6 py-4">
                                                {details}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {time}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {(!eventsData?.data || eventsData.data.length === 0) && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                            No transactions found yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
