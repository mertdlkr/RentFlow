import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { toast } from "sonner";
import { PACKAGE_ID } from "../utils/config";

const MODULE_NAME = "market";

export function useRentFlow() {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    const mintDummyNft = (name: string, description: string, url: string) => {
        if (!PACKAGE_ID || PACKAGE_ID === "YOUR_PACKAGE_ID_HERE") {
            toast.error("Please update PACKAGE_ID in utils/config.ts");
            return;
        }

        const tx = new Transaction();
        tx.moveCall({
            target: `${PACKAGE_ID}::${MODULE_NAME}::mint_dummy_nft`,
            arguments: [
                tx.pure.string(name),
                tx.pure.string(description),
                tx.pure.string(url),
            ],
        });

        signAndExecute(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("Minted successfully:", result);
                    toast.success("NFT Minted Successfully!");
                },
                onError: (error) => {
                    console.error("Mint failed:", error);
                    toast.error("Failed to mint NFT: " + error.message);
                },
            }
        );
    };

    const listItem = (itemId: string, pricePerDay: number) => {
        if (!PACKAGE_ID) return;
        const tx = new Transaction();
        // Assuming we are listing a GameItem for this demo
        const itemType = `${PACKAGE_ID}::${MODULE_NAME}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MODULE_NAME}::list_item`,
            arguments: [
                tx.object(itemId),
                tx.pure.u64(pricePerDay),
            ],
            typeArguments: [itemType],
        });

        signAndExecute(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("Listed successfully:", result);
                    toast.success("Item Listed for Rent!");

                    // Hackathon Demo: Save listing ID to localStorage to show in Marketplace
                    // We need to find the created Listing object ID from the effects.
                    // The `list_item` function calls `transfer::share_object(listing)`.
                    // So there should be a `created` or `mutated` object that is the Listing.
                    // Since it's a new object shared, it might be in `created`.
                    const created = result.effects?.created?.find(
                        (c) => c.owner === "Shared"
                    );
                    if (created) {
                        const currentListings = JSON.parse(localStorage.getItem("rentflow_listings") || "[]");
                        currentListings.push(created.reference.objectId);
                        localStorage.setItem("rentflow_listings", JSON.stringify(currentListings));
                        // Trigger storage event for other tabs/components
                        window.dispatchEvent(new Event("storage"));
                    }
                },
                onError: (error) => {
                    console.error("List failed:", error);
                    toast.error("Failed to list item: " + error.message);
                },
            }
        );
    };

    const rentItem = (listingId: string, pricePerDay: number, days: number) => {
        if (!PACKAGE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MODULE_NAME}::GameItem`;

        const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(pricePerDay * days)]);

        tx.moveCall({
            target: `${PACKAGE_ID}::${MODULE_NAME}::rent_item`,
            arguments: [
                tx.object(listingId),
                coin,
                tx.pure.u64(days),
                tx.object("0x6"), // Clock object
            ],
            typeArguments: [itemType],
        });

        signAndExecute(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("Rented successfully:", result);
                    toast.success("Item Rented Successfully!");
                },
                onError: (error) => {
                    console.error("Rent failed:", error);
                    toast.error("Failed to rent item: " + error.message);
                },
            }
        );
    };

    const withdrawItem = (listingId: string) => {
        if (!PACKAGE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MODULE_NAME}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MODULE_NAME}::withdraw_item`,
            arguments: [
                tx.object(listingId),
                tx.object("0x6"), // Clock object
            ],
            typeArguments: [itemType],
        });

        signAndExecute(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("Withdrawn successfully:", result);
                    toast.success("Item Withdrawn Successfully!");
                },
                onError: (error) => {
                    console.error("Withdraw failed:", error);
                    toast.error("Failed to withdraw item: " + error.message);
                },
            }
        );
    };

    return {
        mintDummyNft,
        listItem,
        rentItem,
        withdrawItem,
        account,
    };
}
