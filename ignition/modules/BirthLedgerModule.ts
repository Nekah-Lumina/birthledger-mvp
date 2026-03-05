import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("BirthLedgerModule", (m) => {
  const birthLedger = m.contract("BirthLedger");
  return { birthLedger };
});
