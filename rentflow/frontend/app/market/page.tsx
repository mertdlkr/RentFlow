"use client";

import { GradientCard } from "@/components/GradientCard";
import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { useRentFlow } from "@/hooks/useRentFlow";
import { useListings } from "@/hooks/useListings";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function MarketplacePage() {
  const { rentItem, account } = useRentFlow();
  const { listings, isLoading } = useListings();
  const [rentDays, setRentDays] = useState("1");
  const [selectedListing, setSelectedListing] = useState<any>(null);

  const handleRent = () => {
    if (!account || !selectedListing) return;
    rentItem(selectedListing.id, Number(selectedListing.price), Number(rentDays));
    setSelectedListing(null);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Marketplace
        </h1>
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-48 w-full max-w-sm bg-muted rounded-lg mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded mb-2"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Marketplace
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing: any) => (
          <GradientCard key={listing.id} className="h-full flex flex-col">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-muted">
              <Image
                src={(typeof listing.image === "string" && listing.image.length > 0) ? listing.image : "https://images.unsplash.com/photo-1614726365723-49cfae967b0b?q=80&w=2000&auto=format&fit=crop"}
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    disabled={listing.isRented}
                    onClick={() => setSelectedListing(listing)}
                  >
                    {listing.isRented ? "Unavailable" : "Rent Now"}
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
                      Total: {(Number(listing.price) * Number(rentDays)) / 1_000_000_000} SUI
                    </p>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleRent}>Confirm Rental</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </GradientCard>
        ))}

        {listings.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No active rentals found. Be the first to list!
          </div>
        )}
      </div>
    </div>
  );
}
