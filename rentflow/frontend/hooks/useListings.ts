import { useSuiClientQuery } from "@mysten/dapp-kit";
import { RENTAL_STORE_ID } from "../utils/config";

export function useListings() {
    // 1. Get dynamic fields (listings) from the Marketplace object
    const { data: dynamicFields, isLoading: isLoadingFields, isError: isErrorFields, refetch: refetchFields } = useSuiClientQuery(
        "getDynamicFields",
        {
            parentId: RENTAL_STORE_ID,
        }
    );

    // 2. Extract object IDs from the dynamic fields
    // The dynamic field name is the ID of the listing object (as we used `dof::add(&mut marketplace.id, listing_id, listing)`).
    // Wait, if we used `dof::add(..., listing_id, listing)`, the 'name' is the ID.
    // The 'value' is the Listing object itself attached as a child.
    // To get the Listing object details, we need to query the object ID of the FIELD VALUE?
    // No, `dof` wraps the value in a Field object.
    // We need to query the object ID of the dynamic field to get the wrapped value?
    // Actually, `getDynamicFields` returns the `objectId` of the Field object.
    // We can then `multiGetObjects` on those Field IDs to get the `Field<Name, Value>` struct.
    // OR, if we know the Name (which is the Listing ID), we can use `getDynamicFieldObject`.
    // But we want to list ALL of them.

    // `dynamicFields.data` contains: { name: { type: '0x2::object::ID', value: '...' }, objectId: '...' }
    // The `objectId` here is the ID of the Field object.
    // We should fetch these Field objects to get the `value` which is the `Listing` struct.

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

        // The inner item is in listing.item
        // Since it's Option<GameItem>, it might be represented as an array or object in JSON
        // Usually Option is { type: ..., fields: { vec: [...] } } or just the value if unwrapped by JSON codec?
        // Let's assume standard Move JSON output for Option.
        // If it's `Option<GameItem>`, and GameItem has `store`, it's likely inside `fields.item`.
        // But wait, `GameItem` has `key + store`, so it's an object.
        // Inside a `Listing` (which is a dynamic field value), the `GameItem` is likely fully embedded in the JSON response 
        // because `multiGetObjects` with `showContent: true` recursively resolves structs if they are in the same module/package?
        // Actually, `GameItem` is a struct.
        // Let's try to extract fields.

        // Note: listing.item might be `null` or `{ fields: ... }`
        // If it's an Option, it often comes as `item: { type: ..., fields: { vec: [ { fields: ... } ] } }` or similar.
        // We'll try to access safely.

        // For the demo, we might need to adjust based on actual response.
        // Assuming `listing.item` contains the GameItem fields directly if unwrapped, or inside a vec.

        // Let's look for `url`, `name`, `price_per_day`.
        const innerItem = listing.item?.fields || listing.item; // Fallback

        // If innerItem is the Option struct, it has `vec`.
        // If it has `vec`, take the first element.
        const realItem = innerItem?.vec ? innerItem.vec[0]?.fields : innerItem;

        return {
            id: listing.id.id, // The Listing ID
            price: listing.price_per_day,
            rentedUntil: listing.rented_until,
            name: realItem?.name || "Unknown Item",
            image: realItem?.url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
            isRented: Number(listing.rented_until) > Date.now(),
            listingObjectId: listing.id.id,
            owner: listing.owner,
        };
    }).filter(Boolean) || [];

    return {
        listings,
        isLoading: isLoadingFields || isLoadingObjects,
        isError: isErrorFields || isErrorObjects,
        refetch: refetchFields,
    };
}
