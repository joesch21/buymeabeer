"use client";

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import { ConnectButton, useActiveAccount, useContractEvents, useReadContract } from "thirdweb/react";
import { contract } from "../utils/contract";
import { TipButtons } from "./TipButtons";
import { RecentCoffees } from "./RecentCoffees";
import { sendTransaction } from "thirdweb";

export const BuyMeCoffee = () => {
    const account = useActiveAccount();
    const [buyAmount, setBuyAmount] = useState(0);
    const [message, setMessage] = useState("");

    const { data: totalCoffees, refetch: refetchTotalCoffees } = useReadContract({
        contract: contract,
        method: "getTotalCoffee",
    });

    const { data: contractEvents, refetch: refetchContractEvents } = useContractEvents({
        contract: contract,
    });

    const truncateWalletAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;
    const convertDate = (timestamp: bigint) => new Date(Number(timestamp) * 1000).toLocaleString();

    const handleTransaction = async () => {
        try {
            if (!account) {
                alert("Please connect your wallet!");
                return;
            }

            // Prepare the contract call
            const transaction = await prepareContractCall({
                contract: contract,
                method: "buyMeACoffee",
                params: [message],
                value: BigInt(toWei(buyAmount.toString())), // Convert amount to Wei
            });

            // Send transaction
            const { transactionHash } = await sendTransaction({
                transaction,
                account: account, // Pass the entire account object here
            });

            console.log("Transaction successful:", transactionHash);
            alert("Thank you for the coffee!");
            setBuyAmount(0);
            setMessage("");
            refetchTotalCoffees();
            refetchContractEvents();
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed. Please try again.");
        }
    };

    return (
        <div
            style={{
                border: "1px solid #252525",
                padding: "2rem",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "500px",
                margin: "2rem auto",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                textAlign: "center",
            }}
        >
            <div style={{ marginBottom: "1.5rem" }}>
                <ConnectButton client={client} chain={chain} />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "1.5rem", marginBottom: "0.75rem", display: "block" }}>Tip Amount</label>
                <TipButtons onSetAmount={setBuyAmount} />
                <input
                    type="number"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(Number(e.target.value))}
                    placeholder="Custom Amount (USD)"
                    style={{
                        marginBottom: "1rem",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: "100%",
                        fontSize: "1rem",
                    }}
                />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "1.5rem", marginBottom: "0.75rem", display: "block" }}>Leave a Message</label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter a message..."
                    style={{
                        marginBottom: "1rem",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: "100%",
                        fontSize: "1rem",
                    }}
                />
            </div>

            <button
                onClick={handleTransaction}
                disabled={!buyAmount || !message}
                style={{
                    padding: "1rem",
                    backgroundColor: "royalblue",
                    color: "white",
                    borderRadius: "8px",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    width: "100%",
                    marginBottom: "1.5rem",
                }}
            >
                Buy Levi a Beer
            </button>

            <div style={{ marginTop: "2rem" }}>
                <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>Total Beers: {totalCoffees?.toString()}</h3>
                <RecentCoffees
                    events={contractEvents || []} // Provide a default empty array
                    truncateWalletAddress={truncateWalletAddress}
                    convertDate={convertDate}
                />
            </div>
        </div>
    );
};
