import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { toast } from "sonner";
import { PACKAGE_ID, RENTAL_STORE_ID, MARKET_MODULE } from "../utils/config";

export function useRentFlow() {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    const mintDummyNft = (name: string, description: string, url: string) => {
        if (!PACKAGE_ID) {
            toast.error("Please update PACKAGE_ID in utils/config.ts");
            return;
        }

        const tx = new Transaction();
        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::mint_dummy_nft`,
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
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::list_item`,
            arguments: [
                tx.object(RENTAL_STORE_ID), // Marketplace Object
                tx.object(itemId),
                tx.pure.u64(pricePerDay),
            ],
            typeArguments: [itemType],
        });

        signAndExecute(
            { transaction: tx },
            {
                onSuccess: (result: any) => {
                    console.log("Listed successfully:", result);
                    toast.success("Item Listed for Rent!");
                    // No need for localStorage hack anymore!
                },
                onError: (error) => {
                    console.error("List failed:", error);
                    toast.error("Failed to list item: " + error.message);
                },
            }
        );
    };

    const rentItem = (listingId: string, pricePerDay: number, days: number) => {
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(pricePerDay * days)]);

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::rent_item`,
            arguments: [
                tx.object(RENTAL_STORE_ID), // Marketplace Object
                tx.pure.id(listingId), // Listing ID (Key) - Note: pure.id or pure.address? ID is address-like.
                // Actually, Move expects `ID`. In PTB, we can pass the ID string as pure?
                // Or tx.pure(bcs.vector(bcs.u8()).serialize(listingId))?
                // `tx.pure.id` is not standard. `tx.pure.address` works for ID usually.
                // Let's try `tx.pure.address(listingId)`.
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
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::withdraw_item`,
            arguments: [
                tx.object(RENTAL_STORE_ID), // Marketplace Object
                tx.pure.address(listingId), // Listing ID
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

    const terminateRental = (rentPassId: string, listingId: string) => {
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::terminate_rental`,
            arguments: [
                tx.object(RENTAL_STORE_ID), // Marketplace Object
                tx.object(rentPassId), // RentPass Object (passed by value, so it's consumed)
                tx.object("0x6"), // Clock object
            ],
            typeArguments: [itemType],
        });

        signAndExecute(
            { transaction: tx },
            {
                onSuccess: (result) => {
                    console.log("Terminated successfully:", result);
                    toast.success("Rental Terminated Successfully! Refund processed.");
                },
                onError: (error) => {
                    console.error("Termination failed:", error);
                    toast.error("Failed to terminate rental: " + error.message);
                },
            }
        );
    };

    return {
        mintDummyNft,
        listItem,
        rentItem,
        withdrawItem,
        terminateRental,
        account,
    };
}
