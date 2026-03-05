import { createPublicClient, createWalletClient, http, defineChain } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import BirthLedgerArtifact from "../artifacts/contracts/BirthLedger.sol/BirthLedger.json" with { type: "json" };

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Hardhat local chain (chainId 31337)
const hardhatLocal = defineChain({
  id: 31337,
  name: "Hardhat Local",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
});

// Default Hardhat node account #0 private key (SAFE ONLY for local testing)
const account = privateKeyToAccount(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
);

const publicClient = createPublicClient({
  chain: hardhatLocal,
  transport: http("http://127.0.0.1:8545"),
});

const walletClient = createWalletClient({
  account,
  chain: hardhatLocal,
  transport: http("http://127.0.0.1:8545"),
});

async function main() {
  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi: BirthLedgerArtifact.abi,
    functionName: "recordEvent",
    args: ["mother123", "child123", "BIRTH"],
  });

  console.log("✅ Transaction hash:", hash);

  const count = await publicClient.readContract({
    address: contractAddress,
    abi: BirthLedgerArtifact.abi,
    functionName: "getEventCount",
  });

  console.log("✅ Events recorded:", count.toString());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
