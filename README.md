**Sunum Linki:** [Görüntüle](https://drive.google.com/file/d/1Y53aZQ2yc_QUYGNwAzUQUg8FwK-uduIa/view?usp=sharing)  
**Live Linki:** [rentflow.mertdlkr.com](https://rentflow.mertdlkr.com)  
**Github Repo:** [mertdlkr/RentFlow](https://github.com/mertdlkr/RentFlow)

# 🌊 RentFlow: The Collateral-Free NFT Rental Protocol

![RentFlow Banner](https://img.shields.io/badge/Status-Live_on_Testnet-00F0FF?style=for-the-badge)
![Sui Network](https://img.shields.io/badge/Built_on-Sui_Network-4DA2FF?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

> **"Own the Gameplay, Not the Asset."**

RentFlow is the first decentralized rental protocol on Sui Network that enables **Collateral-Free** rentals for GameFi assets. By leveraging Sui's **Object Wrapping** and **Kiosk** standards, we unlock liquidity for illiquid assets without requiring borrowers to lock up capital.

---

## 🚀 Live Demo

Experience the future of GameFi rentals live on Sui Testnet:

### 👉 [rentflow.mertdlkr.com](https://rentflow.mertdlkr.com)

---

## ⚡ The Problem vs. The RentFlow Solution

| The Old Way (Ethereum/Solana) ❌ | The RentFlow Way (Sui) ✅ |
| :--- | :--- |
| **High Collateral:** Renters must deposit 150% of item value. | **Zero Collateral:** Rent purely based on a rental fee. |
| **Capital Inefficiency:** Users lock up liquidity. | **Maximum Efficiency:** Pay as you go. |
| **Trust Issues:** Risk of theft if not returned. | **Trustless:** Smart contracts handle ownership & expiry. |
| **Dead Capital:** Assets sit idle in wallets. | **Active Yield:** Assets work 24/7 for their owners. |

## 🛠 Technical Architecture

RentFlow utilizes the power of **Sui Move** to create a secure, wrapping-based rental mechanism.

1.  **Listing:** The Lender locks their NFT into the `RentFlow::Marketplace` (Shared Object).
2.  **Wrapping:** The original NFT is wrapped into a `Listing` object, securing it within the contract.
3.  **Renting:** The Renter pays the fee (SUI). The contract issues a **`RentPass` (Capability Object)** to the renter.
4.  **Access:** Game servers check for the `RentPass` to grant in-game utility.
5.  **Expiry:** Once the time is up, the `RentPass` becomes invalid or is burned. The Lender withdraws their asset.

### Smart Contract Address (Testnet)
`Package ID: 0x86e5253300f62e92824ad51b05f8e9364e39cb3a92842e53b7f1cdd8de8c1dcd`

## 🎨 Features

* **Cyberpunk UI:** A high-end, immersive interface designed for gamers.
* **Instant Rentals:** One-click borrowing with immediate on-chain settlement.
* **Lender Dashboard:** Track your listings and withdraw assets easily.
* **Renter Dashboard:** View active rentals and countdown timers.
* **Sui Kiosk Integration:** Built on the native Sui standards for future-proof compatibility.

## 💻 Tech Stack

* **Blockchain:** Sui Move (Smart Contracts)
* **Frontend:** Next.js 14 (App Router), TypeScript
* **Styling:** Tailwind CSS, Framer Motion (Animations)
* **Integration:** @mysten/dapp-kit, Sui.js

## 📦 Local Development

To run RentFlow locally, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mertdlkr/RentFlow.git
    cd RentFlow
    ```

2.  **Install Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Run the Frontend**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🗺 Roadmap

- [x] **Phase 1: Hackathon MVP** (Live on Testnet, Basic Rent/Lend flows)
- [ ] **Phase 2: Game SDK** (Unity/Unreal plugins for easy integration)
- [ ] **Phase 3: Mainnet Launch** (Audit & Deployment)
- [ ] **Phase 4: RWA Expansion** (Renting tickets, real estate tokens)

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

---

Made with 💙 on **Sui Network**.
