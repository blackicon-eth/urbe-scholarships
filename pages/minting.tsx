import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSmartAccount } from "../hooks/SmartAccountContext";
import { toast } from "react-toastify";
import { Alert } from "../components/AlertWithLink";
import { BASE_SEPOLIA_SCAN_URL } from "../lib/constants";
import Header from "../components/Header";
import { mintNFT } from "../lib/nft";
import { baseSepolia } from "viem/chains";
import { matchString } from "../lib/discord";

export default function LoginPage() {
  const router = useRouter();
  const { ready, authenticated, user, logout } = usePrivy();
  const { smartAccountAddress, smartAccountProvider } = useSmartAccount();

  // If the user is not authenticated, redirect them back to the landing page
  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  const isLoading = !smartAccountAddress || !smartAccountProvider;
  const [isMinting, setIsMinting] = useState(false);

  const onMint = async () => {
    // The mint button is disabled if either of these are undefined
    if (!smartAccountProvider || !smartAccountAddress) return;

    // Store a state to disable the mint button while mint is in progress
    setIsMinting(true);
    const toastId = toast.loading("Minting...");

    try {
      // check if the user has already minted an NFT

      // check if user is eligible to mint an NFT (check the discors username)
      const userDiscordUsername = user?.discord?.username;
      const isEligible = userDiscordUsername && matchString(userDiscordUsername);

      console.log("isEligible: ", isEligible);
      console.log("userDiscordUsername: ", userDiscordUsername);

      // if not eligible, show an error message
      if (!isEligible) {
        toast.update(toastId, {
          render: <Alert>You are not eligible to mint an NFT.</Alert>,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setIsMinting(false);
        return;
      }

      mintNFT(baseSepolia, smartAccountAddress);

      toast.update(toastId, {
        render: "Waiting for your transaction to be confirmed...",
        type: "info",
        isLoading: true,
      });

      // Once we have a hash for the user operation, watch it until the transaction has
      // been confirmed.
      const transactionHash = await smartAccountProvider.waitForUserOperationTransaction(userOpHash);

      toast.update(toastId, {
        render: (
          <Alert href={`${BASE_SEPOLIA_SCAN_URL}/tx/${transactionHash}`}>
            Successfully minted! Click here to see your transaction.
          </Alert>
        ),
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Mint failed with error: ", error);
      toast.update(toastId, {
        render: <Alert>There was an error sending your transaction. See the developer console for more info.</Alert>,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }

    setIsMinting(false);
  };

  return (
    <>
      <Header logout={logout} />
      <main className="flex min-h-screen min-w-full">
        <div className="flex flex-col bg-privy-light-blue flex-1 pb-20 justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="pb-10 text-center text-5xl">
              Welcome {user?.discord?.username?.substring(0, user?.discord?.username?.indexOf("#"))}!
            </div>
            <div className="text-center text-xl text-gray-500 max-w-md mx-auto">Dear urbe associate, it's time to mint.</div>
            <div className="pb-10 text-center text-xl text-gray-500 max-w-md mx-auto">
              Click the button below to mint your NFT.
            </div>
            <div className="flex justify-center items-center">
              <img src="/images/1to1.png" alt="Urbe Logo" className="mb-10 max-w-sm rounded-lg" />
            </div>
            <div className="flex justify-center text-center">
              <button
                className="bg-violet-600 hover:bg-violet-700 py-3 px-20 text-white rounded-lg text-lg"
                onClick={onMint}
                disabled={isLoading || isMinting}
              >
                Mint NFT
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
