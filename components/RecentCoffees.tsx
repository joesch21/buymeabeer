"use client";

interface RecentCoffeesProps {
    events: any[]; // Adjust type if you have a specific event interface
    truncateWalletAddress: (address: string) => string;
    convertDate: (timestamp: bigint) => string;
}

export const RecentCoffees = ({ events, truncateWalletAddress, convertDate }: RecentCoffeesProps) => {
    if (!events || events.length === 0) {
        return <p>No recent Beer purchases.</p>;
    }

    return (
        <div>
            <p style={{ fontSize: "1.15rem" }}>Recent Beers:</p>
            {[...events].reverse().map((event, index) => (
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
                            {truncateWalletAddress(event.args.sender)}
                        </p>
                        <p
                            style={{
                                fontSize: "12px",
                                color: "#888",
                            }}
                        >
                            {convertDate(event.args.timestamp)}
                        </p>
                    </div>
                    <p
                        style={{
                            color: "#888",
                        }}
                    >
                        {event.args.message}
                    </p>
                </div>
            ))}
        </div>
    );
};
