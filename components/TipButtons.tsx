"use client";

interface TipButtonsProps {
    onSetAmount: (amount: number) => void;
}

export const TipButtons = ({ onSetAmount }: TipButtonsProps) => {
    const amounts = [5, 7, 10];

    return (
        <div style={{ display: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            {amounts.map((amount) => (
                <button
                    key={amount}
                    onClick={() => onSetAmount(amount)}
                    style={{
                        padding: "1rem 2rem",
                        backgroundColor: "royalblue",
                        color: "white",
                        borderRadius: "10px",
                        cursor: "pointer",
                    }}
                >
                    ${amount}
                </button>
            ))}
        </div>
    );
};
