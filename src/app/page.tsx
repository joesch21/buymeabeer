"use client";

import { BuyMeCoffee } from "../../components/BuyMeCoffees";

export default function Home() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                textAlign: "center",
                backgroundImage: "url('')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "1rem",
            }}
        >
            <div
                style={{
                    padding: "2rem",
                    borderRadius: "12px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    maxWidth: "600px",
                    width: "100%",
                }}
            >
                <h1
                    style={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: "2.5rem",
                        color: "#ff8c42",
                        marginBottom: "1.5rem",
                    }}
                >
                    Buy Levi a Beer
                </h1>
                <BuyMeCoffee />
            </div>
        </div>
    );
}

