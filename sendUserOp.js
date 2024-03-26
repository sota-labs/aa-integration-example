import axios from "axios";
import { Interface } from "ethers";
import { generateSignature } from "./generateSignature.js";

async function main() {
  axios.defaults.baseURL = "https://api.avabot.sotatek.works";

  const method = "POST";
  const apiPath = "/api/backend/user-operations/send";
  const apiKey = ""; // TODO: add apiKey, e.g. api-key
  const secretKey = ""; // TODO: add secretKey, e.g. secret-key

  const abi = ["function transfer(address to, uint amount)"];
  const iface = new Interface(abi);
  const encodedData = iface.encodeFunctionData("transfer", [
    "0x3438b917f12d674F689DB30D8E3DF209A240288a", // avabot router address
    "1000000000000000",
  ]);

  try {
    const bodyData = {
      network: "network", // TODO: add network, e.g. "ETH_SEPOLIA", "BSC_TESTNET", "AVALANCHE_TESTNET", "BLAST_SEPOLIA", "SOLANA_DEVNET"
      userId: "userId", // TODO: add your userId, e.g. "123456"
      walletAddress: "walletAddress", // TODO: add wallet address created by your bot
      to: "to", // TODO: add to address, here is avabot router address
      data: encodedData,
      value: "value", // TODO: add value you want to send in wei, e.g. "1000000000000000"
    };
    const signature = generateSignature(method, apiPath, bodyData, secretKey);

    const response = await axios.post(
      apiPath,
      { ...bodyData, signature },
      {
        headers: { "X-API-KEY": apiKey },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

main();
