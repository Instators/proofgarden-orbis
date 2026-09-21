"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BASE_SEPOLIA, hexToEth } from "@/lib/wallet";

export type GardenWalletState = {
  address: string;
  chainId: number | null;
  balance: string;
  nonce: number;
  block: number;
  connected: boolean;
  verified: boolean;
  busy: boolean;
  error: string;
};

export function useWalletGarden() {
  const [state, setState] = useState<GardenWalletState>({
    address: "",
    chainId: null,
    balance: "0.0000",
    nonce: 0,
    block: 0,
    connected: false,
    verified: false,
    busy: false,
    error: "",
  });

  const refresh = useCallback(async (address?: string) => {
    const provider = window.ethereum;
    if (!provider) return;
    const accounts = (await provider.request({ method: "eth_accounts" })) as string[];
    const account = address || accounts[0];
    if (!account) return;
    const [chainHex, balanceHex, nonceHex, blockHex] = await Promise.all([
      provider.request({ method: "eth_chainId" }) as Promise<string>,
      provider.request({ method: "eth_getBalance", params: [account, "latest"] }) as Promise<string>,
      provider.request({ method: "eth_getTransactionCount", params: [account, "latest"] }) as Promise<string>,
      provider.request({ method: "eth_blockNumber" }) as Promise<string>,
    ]);
    setState((current) => ({
      ...current,
      address: account,
      chainId: Number.parseInt(chainHex, 16),
      balance: hexToEth(balanceHex),
      nonce: Number.parseInt(nonceHex, 16),
      block: Number.parseInt(blockHex, 16),
      connected: true,
      error: "",
    }));
  }, []);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setState((current) => ({ ...current, error: "No browser wallet detected. Install MetaMask or another EIP-1193 wallet." }));
      return;
    }
    setState((current) => ({ ...current, busy: true, error: "" }));
    try {
      const accounts = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
      if (!accounts[0]) throw new Error("Wallet did not return an account.");
      await refresh(accounts[0]);
    } catch (caught) {
      setState((current) => ({ ...current, error: caught instanceof Error ? caught.message : String(caught) }));
    } finally {
      setState((current) => ({ ...current, busy: false }));
    }
  }, [refresh]);

  const switchToTestnet = useCallback(async () => {
    if (!window.ethereum) return;
    setState((current) => ({ ...current, busy: true, error: "" }));
    try {
      try {
        await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: BASE_SEPOLIA.chainId }] });
      } catch (caught) {
        const code = (caught as { code?: number }).code;
        if (code !== 4902) throw caught;
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: BASE_SEPOLIA.chainId,
            chainName: BASE_SEPOLIA.name,
            nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
            rpcUrls: [BASE_SEPOLIA.rpcUrl],
            blockExplorerUrls: [BASE_SEPOLIA.explorerUrl],
          }],
        });
      }
      await refresh();
    } catch (caught) {
      setState((current) => ({ ...current, error: caught instanceof Error ? caught.message : String(caught) }));
    } finally {
      setState((current) => ({ ...current, busy: false }));
    }
  }, [refresh]);

  const verify = useCallback(async () => {
    if (!window.ethereum || !state.address) return;
    setState((current) => ({ ...current, busy: true, error: "" }));
    try {
      const message = `ProofGarden wallet verification\nAddress: ${state.address}\nNetwork: ${BASE_SEPOLIA.name}`;
      const hex = `0x${Array.from(new TextEncoder().encode(message)).map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
      await window.ethereum.request({ method: "personal_sign", params: [hex, state.address] });
      setState((current) => ({ ...current, verified: true }));
    } catch (caught) {
      setState((current) => ({ ...current, error: caught instanceof Error ? caught.message : String(caught) }));
    } finally {
      setState((current) => ({ ...current, busy: false }));
    }
  }, [state.address]);

  useEffect(() => {
    if (!window.ethereum) return;
    void refresh();
    const handler = () => void refresh();
    window.ethereum.on?.("accountsChanged", handler);
    window.ethereum.on?.("chainChanged", handler);
    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handler);
      window.ethereum?.removeListener?.("chainChanged", handler);
    };
  }, [refresh]);

  const onTargetTestnet = state.chainId === BASE_SEPOLIA.chainIdNumber;
  const vitality = useMemo(() => Math.min(100, 22 + Math.min(state.nonce * 7, 48) + (state.verified ? 18 : 0) + (onTargetTestnet ? 12 : 0)), [state.nonce, state.verified, onTargetTestnet]);

  return { ...state, onTargetTestnet, vitality, connect, switchToTestnet, verify, refresh };
}
