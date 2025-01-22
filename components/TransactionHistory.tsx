"use client";

import { useContractEvents } from "thirdweb/react";

export const TransactionHistory = ({ contract }: { contract: any }) => {
  const { data: contractEvents } = useContractEvents({
    contract,
  });

  const truncateWalletAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;
  const convertDate = (timestamp: bigint) =>
    new Date(Number(timestamp) * 1000).toLocaleString();

  return (
    <div>
      <h3 style={{ marginBottom: "1rem" }}>Recent Coffees:</h3>
      {contractEvents && contractEvents.length > 0 ? (
        [...contractEvents].reverse().map((event, index) => {
          const sender = event.args?.sender || "Unknown";
          const timestamp = event.args?.timestamp
            ? convertDate(event.args.timestamp)
            : "Unknown";
          const message = event.args?.message || "No message";

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                margin: "1rem 0",
                backgroundColor: "#151515",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "0.5rem",
                  }}
                >
                  {truncateWalletAddress(sender)}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  {timestamp}
                </p>
              </div>
              <p style={{ color: "#888" }}>{message}</p>
            </div>
          );
        })
      ) : (
        <p style={{ fontSize: "1rem", color: "#888" }}>No coffees yet.</p>
      )}
    </div>
  );
};
