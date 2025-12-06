"use client";

import { GradientCard } from "@/components/GradientCard";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { useRentFlow } from "@/hooks/useRentFlow";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { PACKAGE_ID } from "@/utils/config";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// For Hackathon Demo: We use localStorage to track "Listed Items" because querying all shared objects 
// without an indexer is slow/complex. In a real app, we'd use an Indexer API.
const getSessionListings = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("rentflow_listings");
  return stored ? JSON.parse(stored) : [];
};

export default function MarketplacePage() {
  const { rentItem, account } = useRentFlow();
  const [listings, setListings] = useState<string[]>([]);
  const [rentDays, setRentDays] = useState("1");
  const [selectedListing, setSelectedListing] = useState<any>(null);

  useEffect(() => {
    setListings(getSessionListings());
    // Listen for storage events to update if listed in another tab
    const handleStorage = () => setListings(getSessionListings());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Fetch details for each listing ID
  // Note: In a real app, we would query *all* listings. Here we query the ones we "know" about.
  const { data: listingObjects, refetch } = useSuiClientQuery(
    "multiGetObjects",
    {
      ids: listings,
      options: {
        showContent: true,
        showDisplay: true,
      },
    },
    {
      enabled: listings.length > 0,
    }
  );

  const handleRent = () => {
    if (!account || !selectedListing) return;
    const pricePerDay = selectedListing.content.fields.price_per_day;
    rentItem(selectedListing.objectId, Number(pricePerDay), Number(rentDays));
    setSelectedListing(null);
    // Optimistic update or refetch
    setTimeout(() => refetch(), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Marketplace
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listingObjects?.map((obj: any) => {
          const content = obj.data?.content?.fields;
          // We need to fetch the inner item to show details. 
          // The Listing struct has `item: Option<T>`.
          // But `showContent` only shows the Listing fields. 
          // The `item` field will show type info but not the inner fields unless we do a dynamic field lookup or if it's embedded.
          // Since `GameItem` has `store`, it's wrapped inside `Option`.
          // Sui Move serialization for Option usually shows the value if present.
          // Let's assume for this hackathon we might not see the inner item details easily without a second query 
          // OR we just show "Mystery Item" if we can't parse it.
          // HOWEVER, for the demo, we can store the metadata in localStorage too when listing!
          // Let's try to see what `content` has.

          // Hack: For the demo, we will rely on the fact that we probably can't see the inner item details 
          // easily in the Listing object response without `dynamic_field` or recursive fetch.
          // BUT, we can try to use the `display` if we set it up. We didn't.
          // So, we will show generic info or try to parse if possible.

          const isRented = Number(content?.rented_until) > Date.now();

          return (
            <GradientCard key={obj.data?.objectId} className="h-full flex flex-col">
              <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-muted">
                <Image
                  src="https://images.unsplash.com/photo-1614726365723-49cfae967b0b?q=80&w=2000&auto=format&fit=crop"
                  alt="Listed Item"
                  fill
                  className="object-cover"
                />
                {isRented && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold text-xl border-2 border-white px-4 py-2 rounded-md transform -rotate-12">
                      RENTED
                    </span>
                  </div>
                )}
              </div>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl">Game Item</CardTitle>
                <CardDescription>
                  Price: {Number(content?.price_per_day) / 1_000_000_000} SUI / Day
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-0 pt-4 mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      disabled={isRented}
                      onClick={() => setSelectedListing(obj.data)}
                    >
                      {isRented ? "Unavailable" : "Rent Now"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rent Item</DialogTitle>
                      <DialogDescription>
                        How many days do you want to rent this item for?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        type="number"
                        min="1"
                        placeholder="Days"
                        value={rentDays}
                        onChange={(e) => setRentDays(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Total: {(Number(content?.price_per_day) * Number(rentDays)) / 1_000_000_000} SUI
                      </p>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleRent}>Confirm Rental</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </GradientCard>
          );
        })}

        {(!listingObjects || listingObjects.length === 0) && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No listings found. Go to Dashboard to list an item!
          </div>
        )}
      </div>
    </div>
  );
}
