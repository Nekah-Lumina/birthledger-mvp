import hre from "hardhat";

async function main() {
  const birthLedger = await hre.viem.deployContract("BirthLedger");
  console.log("✅ BirthLedger deployed to:", birthLedger.address);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
