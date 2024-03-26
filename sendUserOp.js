import axios from "axios";
import { Interface } from "ethers";
import { generateSignature } from "./generateSignature.js";

async function main() {
  axios.defaults.baseURL = "https://api.avabot.sotatek.works";

  const method = "POST";
  const apiPath = "/api/backend/user-operations/send";
  const apiKey = "tinbot-test-api"; // TODO: add apiKey, e.g. api-key
  const secretKey = "tinbot-secret-key"; // TODO: add secretKey, e.g. secret-key

  const abi = ["function transfer(address to, uint amount)"];
  const iface = new Interface(abi);
  const encodedData = iface.encodeFunctionData("transfer", [
    "0x3438b917f12d674F689DB30D8E3DF209A240288a", // avabot router address
    "1000000000000000",
  ]);

  try {
    const bodyData = {
      network: "BSC_TESTNET", // TODO: add network, e.g. "ETH_SEPOLIA", "BSC_TESTNET", "AVALANCHE_TESTNET", "BLAST_SEPOLIA", "SOLANA_DEVNET"
      userId: "6767187788", // TODO: add your userId, e.g. "123456"
      walletAddress: "0x8224DEE628feEb705Aa79880d8A7E44838F427c4", // TODO: add wallet address created by your bot
      to: "0x3438b917f12d674F689DB30D8E3DF209A240288a", // TODO: add to address, here is avabot router address
      data: encodedData,
      value: "1000000000000000", // TODO: add value you want to send in wei, e.g. "1000000000000000"
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

    // successful tx: https://testnet.bscscan.com/tx/0x309de4712308a3e6c89fff08662e22c4c524c9a5c508ebd548b5d21c00830d3a
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

main();
