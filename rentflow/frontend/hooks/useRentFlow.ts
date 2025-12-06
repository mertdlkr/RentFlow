import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { toast } from "sonner";
import { PACKAGE_ID, RENTAL_STORE_ID, MARKET_MODULE } from "../utils/config";

export function useRentFlow() {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

    const mintDummyNft = async (name: string, description: string, url: string, onSuccess?: () => void) => {
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

        try {
            await signAndExecute({ transaction: tx });
            toast.success("NFT Minted Successfully!");
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error("Mint failed:", error);
            toast.error("Failed to mint NFT: " + error.message);
        }
    };

    const listItem = async (itemId: string, pricePerDay: number, onSuccess?: () => void) => {
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::list_item`,
            arguments: [
                tx.object(RENTAL_STORE_ID),
                tx.object(itemId),
                tx.pure.u64(pricePerDay),
            ],
            typeArguments: [itemType],
        });

        try {
            await signAndExecute({ transaction: tx });
            toast.success("Item Listed for Rent!");
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error("List failed:", error);
            toast.error("Failed to list item: " + error.message);
        }
    };

    const rentItem = async (listingId: string, pricePerDay: number, days: number, onSuccess?: () => void) => {
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(pricePerDay * days)]);

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::rent_item`,
            arguments: [
                tx.object(RENTAL_STORE_ID),
                tx.pure.address(listingId),
                coin,
                tx.pure.u64(days),
                tx.object("0x6"),
            ],
            typeArguments: [itemType],
        });

        try {
            await signAndExecute({ transaction: tx });
            toast.success("Item Rented Successfully!");
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error("Rent failed:", error);
            toast.error("Failed to rent item: " + error.message);
        }
    };

    const withdrawItem = async (listingId: string, onSuccess?: () => void) => {
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::withdraw_item`,
            arguments: [
                tx.object(RENTAL_STORE_ID),
                tx.pure.address(listingId),
                tx.object("0x6"),
            ],
            typeArguments: [itemType],
        });

        try {
            await signAndExecute({ transaction: tx });
            toast.success("Item Withdrawn Successfully!");
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error("Withdraw failed:", error);
            toast.error("Failed to withdraw item: " + error.message);
        }
    };

    const terminateRental = async (rentPassId: string, listingId: string, onSuccess?: () => void) => {
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::terminate_rental`,
            arguments: [
                tx.object(RENTAL_STORE_ID),
                tx.object(rentPassId),
                tx.object("0x6"),
            ],
            typeArguments: [itemType],
        });

        try {
            await signAndExecute({ transaction: tx });
            toast.success("Rental Terminated Successfully! Refund processed.");
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error("Termination failed:", error);
            toast.error("Failed to terminate rental: " + error.message);
        }
    };

    const claimEarnings = async (listingId: string, onSuccess?: () => void) => {
        if (!PACKAGE_ID || !RENTAL_STORE_ID) return;
        const tx = new Transaction();
        const itemType = `${PACKAGE_ID}::${MARKET_MODULE}::GameItem`;

        tx.moveCall({
            target: `${PACKAGE_ID}::${MARKET_MODULE}::claim_earnings`,
            arguments: [
                tx.object(RENTAL_STORE_ID),
                tx.pure.address(listingId),
            ],
            typeArguments: [itemType],
        });

        try {
            await signAndExecute({ transaction: tx });
            toast.success("Earnings Claimed Successfully!");
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error("Claim failed:", error);
            toast.error("Failed to claim earnings: " + error.message);
        }
    };

    return {
        mintDummyNft,
        listItem,
        rentItem,
        withdrawItem,
        terminateRental,
        claimEarnings,
        account,
    };
}
