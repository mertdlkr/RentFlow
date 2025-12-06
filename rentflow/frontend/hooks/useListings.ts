import { useSuiClientQuery } from "@mysten/dapp-kit";
import { RENTAL_STORE_ID } from "../utils/config";
import { parseMoveString } from "../utils/format";

export function useListings() {
    // 1. Get dynamic fields (listings) from the Marketplace object
    const { data: dynamicFields, isLoading: isLoadingFields, isError: isErrorFields, refetch: refetchFields } = useSuiClientQuery(
        "getDynamicFields",
        {
            parentId: RENTAL_STORE_ID,
        }
    );

    // 2. Extract object IDs from the dynamic fields
    const fieldIds = dynamicFields?.data.map((field) => field.objectId) || [];

    const { data: listingObjects, isLoading: isLoadingObjects, isError: isErrorObjects } = useSuiClientQuery(
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

    // Parse the data
    const listings = listingObjects?.map((obj: any) => {
        // The object is the Listing object itself (Dynamic Object Field)
        // content.fields IS the Listing struct
        const listing = obj.data?.content?.fields;

        if (!listing) return null;

        const innerItem = listing.item?.fields || listing.item; // Fallback
        const realItem = innerItem?.vec ? innerItem.vec[0]?.fields : innerItem;

        const name = parseMoveString(realItem?.name) || "Unknown Item";
        const url = parseMoveString(realItem?.url);
        const image = url.length > 0 ? url : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop";

        return {
            id: listing.id.id, // The Listing ID
            price: listing.price_per_day,
            rentedUntil: listing.rented_until,
            name,
            image,
            isRented: Number(listing.rented_until) > Date.now(),
            listingObjectId: listing.id.id,
            owner: listing.owner,
            // Balance is directly the value based on logs
            balance: typeof listing.balance === 'object' ? (listing.balance?.fields?.value || listing.balance?.value || 0) : listing.balance,
        };
    }).filter(Boolean) || [];

    return {
        listings,
        isLoading: isLoadingFields || isLoadingObjects,
        isError: isErrorFields || isErrorObjects,
        refetch: refetchFields,
    };
}
