"use client";

import { client } from "@/app/client";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";

// Configure Wallets
const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "farcaster",
        "email",
        "x",
        "passkey",
        "phone",
        "apple",
        "facebook",
        "coinbase",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("com.binance"),
  createWallet("com.trustwallet.app"),
];

// ConnectWallet Component
export const ConnectWallet = () => {
  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={darkTheme({
          colors: { modalBg: "hsl(309, 49%, 45%)" }, // Artistic dark theme
        })}
        connectModal={{ size: "compact" }} // Compact modal for better UX
      />
    </div>
  );
};
