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

    /// Error codes
    const EInsufficientPayment: u64 = 0;
    const EItemAlreadyRented: u64 = 1;
    const ENotOwner: u64 = 2;
    const EItemIsRented: u64 = 3;
    const ENoItemInListing: u64 = 4;

    /// A simple dummy NFT for testing
    struct GameItem has key, store {
        id: UID,
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
    }

    /// Wraps an item for rent
    struct Listing<T: key + store> has key, store {
        id: UID,
        item: Option<T>, // Wrapped item. Option allows us to extract it.
        owner: address,
        price_per_day: u64,
        rented_until: u64, // Timestamp in ms
        balance: Balance<SUI>, // Accumulated rent fees
    }

    /// The object given to the renter
    struct RentPass has key, store {
        id: UID,
        listing_id: ID,
        valid_until: u64,
    }

    // --- Functions ---

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

    /// List an item for rent
    public fun list_item<T: key + store>(
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
        transfer::share_object(listing);
    }

    /// Rent an item
    public fun rent_item<T: key + store>(
        listing: &mut Listing<T>,
        payment: Coin<SUI>,
        days: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
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
            listing_id: object::id(listing),
            valid_until: listing.rented_until,
        };

        transfer::public_transfer(rent_pass, tx_context::sender(ctx));
    }

    /// Withdraw the item (only owner, only if not rented)
    public fun withdraw_item<T: key + store>(
        listing: &mut Listing<T>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
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
    }
    
    /// Claim earnings without withdrawing item
    public fun claim_earnings<T: key + store>(
        listing: &mut Listing<T>,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == listing.owner, ENotOwner);
        let amount = balance::value(&listing.balance);
        if (amount > 0) {
            let earnings = coin::take(&mut listing.balance, amount, ctx);
            transfer::public_transfer(earnings, listing.owner);
        };
    }
}
