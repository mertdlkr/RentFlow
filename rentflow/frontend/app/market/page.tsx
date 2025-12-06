"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRentFlow } from "@/hooks/useRentFlow";
import { useListings } from "@/hooks/useListings";
import { useState, useMemo, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, SearchX, Check } from "lucide-react";

export default function MarketplacePage() {
  const { rentItem, account } = useRentFlow();
  const { listings, isLoading, refetch } = useListings();
  const [rentDays, setRentDays] = useState("1");
  const [selectedListing, setSelectedListing] = useState<any>(null);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState("All NFTs");
  const [priceRange, setPriceRange] = useState<[number, number]>([0.05, 500]);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("Price: Low to High");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRent = () => {
    if (!account || !selectedListing) return;
    rentItem(selectedListing.id, Number(selectedListing.price), Number(rentDays), () => {
      setTimeout(() => {
        refetch();
      }, 1000);
    });
    setSelectedListing(null);
  };

  const toggleGame = (game: string) => {
    setSelectedGames(prev =>
      prev.includes(game)
        ? prev.filter(g => g !== game)
        : [...prev, game]
    );
  };

  const filteredListings = useMemo(() => {
    return listings.filter((listing: any) => {
      // Category Filter
      if (selectedCategory !== "All NFTs" && listing.category !== selectedCategory) return false;

      // Price Filter
      const price = Number(listing.price) / 1_000_000_000;
      if (price < priceRange[0] || price > priceRange[1]) return false;

      // Game Filter
      if (selectedGames.length > 0 && !selectedGames.includes(listing.game)) return false;

      return true;
    }).sort((a: any, b: any) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);

      switch (sortOption) {
        case "Price: Low to High":
          return priceA - priceB;
        case "Price: High to Low":
          return priceB - priceA;
        // Assuming IDs are somewhat chronological or we could add a timestamp if available
        case "Newest":
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });
  }, [listings, selectedCategory, priceRange, selectedGames, sortOption]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen pt-20 justify-center items-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-primary font-display tracking-widest uppercase text-sm">Loading Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 max-w-[1600px] mx-auto w-full min-h-screen">
      {/* Sidebar Filters */}
      <aside className="hidden lg:flex flex-col w-72 p-6 gap-8 border-r border-white/5 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto">
        {/* Category Filter */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-white text-lg font-display font-bold">Filters</h3>
            <p className="text-slate-400 text-sm mt-1">Refine your search</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSelectedCategory("All NFTs")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group w-full text-left",
                selectedCategory === "All NFTs"
                  ? "bg-primary/20 border border-primary/30 text-white"
                  : "hover:bg-white/5 text-slate-300 hover:text-white"
              )}
            >
              <span className={cn("material-symbols-outlined transition-colors", selectedCategory === "All NFTs" ? "text-primary" : "group-hover:text-primary")}>apps</span>
              <span className="font-medium">All NFTs</span>
            </button>

            {[
              { name: 'Weapons', icon: 'swords' },
              { name: 'Skins', icon: 'checkroom' },
              { name: 'Land', icon: 'terrain' },
              { name: 'Characters', icon: 'group' }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group w-full text-left",
                  selectedCategory === category.name
                    ? "bg-primary/20 border border-primary/30 text-white"
                    : "hover:bg-white/5 text-slate-300 hover:text-white"
                )}
              >
                <span className={cn("material-symbols-outlined transition-colors", selectedCategory === category.name ? "text-primary" : "group-hover:text-primary")}>
                  {category.icon}
                </span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Price (SUI)</h3>
            <span className="text-xs text-primary font-mono">{priceRange[0].toFixed(2)} - {priceRange[1].toFixed(2)}</span>
          </div>
          <div className="px-2 pt-2">
            <Slider
              min={0.05}
              max={500}
              step={0.05}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
        </div>

        {/* Game Checklist */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
          <h3 className="text-white font-medium mb-1">Game</h3>
          {['Star Atlas', 'Axie Infinity', 'SuiWorld', 'CyberRaiders'].map((game) => (
            <label key={game} className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectedGames.includes(game)}
                  onChange={() => toggleGame(game)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-[#395456] bg-transparent checked:border-primary checked:bg-primary transition-all"
                />
                <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
              </div>
              <span className={cn("text-sm transition-colors", selectedGames.includes(game) ? "text-white" : "text-slate-300 group-hover:text-white")}>
                {game}
              </span>
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 flex flex-col gap-8">
        {/* Header & Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-wide">Marketplace</h1>
            <p className="text-slate-400">Explore and rent exclusive gaming assets on Sui Network</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm hidden sm:block">Showing {filteredListings.length} results</span>

            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 bg-[#27393a] text-white px-4 py-2.5 rounded-lg border border-white/5 hover:border-primary/50 transition-all outline-none"
              >
                <span className="text-sm font-medium">Sort by: {sortOption}</span>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isSortOpen && "rotate-180")} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a2c2e] border border-white/10 rounded-lg shadow-xl z-50 flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100">
                  {["Price: Low to High", "Price: High to Low", "Newest"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortOption(option);
                        setIsSortOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-primary",
                        sortOption === option ? "text-primary bg-white/5" : "text-slate-300"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing: any) => {
            const isOwner = account?.address === listing.owner;
            const isRented = listing.isRented;

            return (
              <div key={listing.id} className={cn(
                "group relative flex flex-col rounded-2xl bg-[#1a2c2e]/60 border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-300",
                isRented ? "grayscale hover:grayscale-0" : "hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,238,255,0.2)] hover:border-primary/40"
              )}>
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <div className={cn(
                    "absolute top-3 right-3 z-10 px-3 py-1 rounded-full backdrop-blur-md border flex items-center gap-1.5",
                    isRented ? "bg-black/70 border-red-500/30" : "bg-black/70 border-primary/30"
                  )}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", isRented ? "bg-red-500" : "bg-primary animate-pulse")}></span>
                    <span className={cn("text-xs font-bold tracking-wide uppercase", isRented ? "text-red-500" : "text-primary")}>
                      {isRented ? "Rented" : "Lendable"}
                    </span>
                  </div>

                  <Image
                    src={(typeof listing.image === "string" && listing.image.length > 0) ? listing.image : "https://images.unsplash.com/photo-1614726365723-49cfae967b0b?q=80&w=2000&auto=format&fit=crop"}
                    alt={listing.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2223] via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">{listing.name}</h3>
                      <p className="text-slate-400 text-xs mt-1 font-medium tracking-wide uppercase">{listing.game}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex flex-col gap-3">
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold text-white">{Number(listing.price) / 1_000_000_000}</span>
                      <span className="text-sm font-medium text-primary mb-1.5">SUI</span>
                      <span className="text-slate-500 text-sm mb-1.5 ml-1">/ day</span>
                    </div>

                    {isOwner ? (
                      <button disabled className="w-full py-3 rounded-lg bg-[#27393a] text-slate-500 font-bold text-sm tracking-wide uppercase cursor-not-allowed border border-white/5">
                        You Own This
                      </button>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            disabled={isRented}
                            onClick={() => setSelectedListing(listing)}
                            className={cn(
                              "w-full py-3 rounded-lg font-bold text-sm tracking-wide uppercase transition-colors",
                              isRented
                                ? "bg-[#27393a] text-slate-500 cursor-not-allowed border border-white/5"
                                : "bg-primary hover:bg-primary-dark text-background-dark shadow-[0_0_15px_rgba(0,238,255,0.15)] hover:shadow-neon"
                            )}
                          >
                            {isRented ? "Unavailable" : "Rent Now"}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#1a2c2e] border-white/10 text-white">
                          <DialogHeader>
                            <DialogTitle className="font-display text-2xl">Rent {listing.name}</DialogTitle>
                            <DialogDescription className="text-slate-400">
                              Enter the duration for your rental.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-300">Duration (Days)</label>
                              <Input
                                type="number"
                                min="1"
                                value={rentDays}
                                onChange={(e) => setRentDays(e.target.value)}
                                className="bg-[#0f2223] border-white/10 text-white focus:border-primary"
                              />
                            </div>
                            <div className="p-4 rounded-lg bg-[#0f2223] border border-white/5 flex justify-between items-center">
                              <span className="text-slate-400">Total Cost</span>
                              <span className="text-xl font-bold text-primary">{(Number(listing.price) * Number(rentDays)) / 1_000_000_000} SUI</span>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleRent} className="w-full bg-primary text-black hover:bg-primary/90 font-bold">
                              Confirm Rental
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredListings.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <SearchX className="w-10 h-10 opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
              <p className="text-slate-400 max-w-md text-center">
                We couldn't find any items matching your current filters. Try adjusting your price range or selecting different categories.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All NFTs");
                  setPriceRange([0.05, 500]);
                  setSelectedGames([]);
                }}
                className="mt-6 px-6 py-2 bg-[#27393a] hover:bg-[#27393a]/80 text-white rounded-lg transition-colors font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
