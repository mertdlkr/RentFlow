#[allow(lint(self_transfer))]
module rentflow::market {
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::clock::{Self, Clock};
    use sui::balance::{Self, Balance};
    use std::option::{Self, Option};
    use sui::dynamic_object_field as dof;

    use sui::event;

    /// Error codes
    const EInsufficientPayment: u64 = 0;
    const EItemAlreadyRented: u64 = 1;
    const ENotOwner: u64 = 2;
    const EItemIsRented: u64 = 3;
    const ENoItemInListing: u64 = 4;
    const EListingNotFound: u64 = 5;

    // --- Events ---
    struct ListingCreated has copy, drop {
        listing_id: ID,
        owner: address,
        price: u64,
    }

    struct ItemRented has copy, drop {
        listing_id: ID,
        renter: address,
        days: u64,
        price: u64,
    }

    struct RentalTerminated has copy, drop {
        listing_id: ID,
        renter: address,
        refund: u64,
    }

    struct ItemWithdrawn has copy, drop {
        listing_id: ID,
        owner: address,
    }

    /// A simple dummy NFT for testing
    struct GameItem has key, store {
        id: UID,
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
    }

    /// The Marketplace object (Store)
    struct Marketplace has key, store {
        id: UID,
    }

    /// Wraps an item for rent
    struct Listing<T: key + store> has key, store {
        id: UID,
        item: Option<T>, 
        owner: address,
        price_per_day: u64,
        rented_until: u64, 
        balance: Balance<SUI>, 
    }

    /// The object given to the renter
    struct RentPass has key, store {
        id: UID,
        listing_id: ID,
        valid_until: u64,
        start_time: u64,
    }

    // --- Functions ---

    /// Create and share a new Marketplace
    public fun create_marketplace(ctx: &mut TxContext) {
        let marketplace = Marketplace {
            id: object::new(ctx),
        };
        transfer::share_object(marketplace);
    }

    /// Mint a dummy NFT for testing
    public fun mint_dummy_nft(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let item = GameItem {
            id: object::new(ctx),
            name,
            description,
            url,
        };
        transfer::public_transfer(item, tx_context::sender(ctx));
    }

    /// List an item for rent (Adds to Marketplace as DOF)
    public fun list_item<T: key + store>(
        marketplace: &mut Marketplace,
        item: T,
        price_per_day: u64,
        ctx: &mut TxContext
    ) {
        let listing = Listing {
            id: object::new(ctx),
            item: option::some(item),
            owner: tx_context::sender(ctx),
            price_per_day,
            rented_until: 0,
            balance: balance::zero(),
        };
        let listing_id = object::id(&listing);
        
        event::emit(ListingCreated {
            listing_id,
            owner: tx_context::sender(ctx),
            price: price_per_day,
        });

        // Add listing to marketplace using its ID as the key
        dof::add(&mut marketplace.id, listing_id, listing);
    }

    /// Rent an item (Access via Marketplace)
    public fun rent_item<T: key + store>(
        marketplace: &mut Marketplace,
        listing_id: ID,
        payment: Coin<SUI>,
        days: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Borrow the listing from the marketplace
        assert!(dof::exists_(&marketplace.id, listing_id), EListingNotFound);
        let listing = dof::borrow_mut<ID, Listing<T>>(&mut marketplace.id, listing_id);

        let current_time = clock::timestamp_ms(clock);
        
        // Check if already rented
        assert!(current_time >= listing.rented_until, EItemAlreadyRented);

        // Check payment
        let total_price = listing.price_per_day * days;
        assert!(coin::value(&payment) >= total_price, EInsufficientPayment);

        // Process payment
        let paid_balance = coin::into_balance(payment);
        balance::join(&mut listing.balance, paid_balance);

        // Update listing
        listing.rented_until = current_time + (days * 86400 * 1000);

        // Mint RentPass
        let rent_pass = RentPass {
            id: object::new(ctx),
            listing_id,
            valid_until: listing.rented_until,
            start_time: current_time,
        };

        event::emit(ItemRented {
            listing_id,
            renter: tx_context::sender(ctx),
            days,
            price: total_price,
        });

        transfer::public_transfer(rent_pass, tx_context::sender(ctx));
    }

    /// Terminate rental early (Renter only)
    public fun terminate_rental<T: key + store>(
        marketplace: &mut Marketplace,
        rent_pass: RentPass,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let RentPass { id, listing_id, valid_until, start_time } = rent_pass;
        object::delete(id);

        assert!(dof::exists_(&marketplace.id, listing_id), EListingNotFound);
        let listing = dof::borrow_mut<ID, Listing<T>>(&mut marketplace.id, listing_id);

        let current_time = clock::timestamp_ms(clock);

        // If already expired, just return (no refund)
        if (current_time >= valid_until) {
            event::emit(RentalTerminated {
                listing_id,
                renter: tx_context::sender(ctx),
                refund: 0,
            });
            return
        };

        // Calculate elapsed percentage
        let total_duration = valid_until - start_time;
        let elapsed = current_time - start_time;
        
        // Avoid division by zero
        if (total_duration == 0) {
            listing.rented_until = current_time;
            return
        };

        // Percentage * 100 for integer arithmetic
        let percentage = (elapsed * 100) / total_duration;

        let refund_percentage = if (percentage < 50) {
            50
        } else if (percentage < 75) {
            25
        } else if (percentage < 90) {
            10
        } else {
            0
        };

        let mut refund_amount = 0;

        if (refund_percentage > 0) {
            let total_balance = balance::value(&listing.balance);
            // We can't easily track exactly which payment corresponds to this rental if multiple happened (though listing logic implies one at a time).
            // Assuming balance holds the rent for this session.
            // But wait, `withdraw_item` empties balance. So balance IS the rent.
            
            refund_amount = (total_balance * refund_percentage) / 100;
            if (refund_amount > 0) {
                let refund = coin::take(&mut listing.balance, refund_amount, ctx);
                transfer::public_transfer(refund, tx_context::sender(ctx));
            };
        };

        event::emit(RentalTerminated {
            listing_id,
            renter: tx_context::sender(ctx),
            refund: refund_amount,
        });

        // Reset rented_until so it can be rented again or withdrawn
        listing.rented_until = current_time;
    }

    /// Withdraw the item (only owner, only if not rented)
    public fun withdraw_item<T: key + store>(
        marketplace: &mut Marketplace,
        listing_id: ID,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(dof::exists_(&marketplace.id, listing_id), EListingNotFound);
        let listing = dof::borrow_mut<ID, Listing<T>>(&mut marketplace.id, listing_id);

        // Check owner
        assert!(tx_context::sender(ctx) == listing.owner, ENotOwner);

        // Check if rented
        let current_time = clock::timestamp_ms(clock);
        assert!(current_time >= listing.rented_until, EItemIsRented);

        // Check if item exists in listing
        assert!(option::is_some(&listing.item), ENoItemInListing);

        // Extract item
        let item = option::extract(&mut listing.item);
        transfer::public_transfer(item, listing.owner);
        
        // Withdraw earnings
        let amount = balance::value(&listing.balance);
        if (amount > 0) {
            let earnings = coin::take(&mut listing.balance, amount, ctx);
            transfer::public_transfer(earnings, listing.owner);
        };

        event::emit(ItemWithdrawn {
            listing_id,
            owner: tx_context::sender(ctx),
        });

        // Remove listing from marketplace and destroy it
        // Note: We can't easily destroy a Listing with Balance inside if it has dust, 
        // but we emptied it above. 
        // However, we can't destroy `Listing` struct because it doesn't have `drop`.
        // So we must unpack it.
        // But `Listing` has `id: UID` which we must delete.
        // And `balance: Balance<SUI>` which we must destroy (it should be empty).
        
        // To properly remove, we need to take it out of DOF.
        let listing_val = dof::remove<ID, Listing<T>>(&mut marketplace.id, listing_id);
        let Listing { id, item, owner: _, price_per_day: _, rented_until: _, balance } = listing_val;
        object::delete(id);
        balance::destroy_zero(balance);
        option::destroy_none(item);
    }
}
