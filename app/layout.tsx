import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://proofgarden-orbis.vercel.app"),
  title: { default: "ProofGarden | Onchain History, Cultivated", template: "%s | ProofGarden" },
  description: "ProofGarden turns verifiable wallet activity into a living ecosystem, then uses Orbis to make that world continuously evolve.",
  applicationName: "ProofGarden",
  keywords: ["ProofGarden", "Orbis", "Web3", "onchain identity", "Base Sepolia", "Reactor"],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: { title: "ProofGarden | Onchain History, Cultivated", description: "A living ecosystem grown from verifiable wallet activity and powered by Orbis.", type: "website", siteName: "ProofGarden" },
  twitter: { card: "summary_large_image", title: "ProofGarden | Onchain History, Cultivated", description: "A living ecosystem grown from verifiable wallet activity and powered by Orbis." },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
