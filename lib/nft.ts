import { Chain, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { NFT_ADDRESS } from "./constants";
import ABI from "../lib/nftABI.json";

const account = privateKeyToAccount(`0x${process.env.WALLET_PRIVATE_KEY!}` as `0x${string}`);

export const getPublicClient = async (network: Chain) => {
  return createPublicClient({
    chain: network,
    transport: http(),
  });
};

export const getWalletClient = async (network: Chain) => {
  return createWalletClient({
    chain: network,
    transport: http(),
  });
};

export const mintNFT = async (network: Chain, address: string) => {
  const walletClient = await getWalletClient(network);
  const publicClient = await getPublicClient(network);
  const { request } = await publicClient.simulateContract({
    address: NFT_ADDRESS,
    abi: ABI,
    functionName: "safeMint",
    args: [address],
    account,
  });
  const hash = await walletClient.writeContract(request);
};
