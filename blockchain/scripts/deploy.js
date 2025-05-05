import hardhat from "hardhat";

async function main() {
  const Contract = await hardhat.ethers.getContractFactory("DummyNFTTrader");
  const contract = await Contract.deploy();
  await contract.deployed();

  console.log(`Contract deployed to: ${contract.address}`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
