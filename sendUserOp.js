import axios from "axios";
import { Interface } from "ethers";
import { generateSignature } from "./generateSignature.js";
import { avabot_router_abi } from "./abis.js";

async function main() {
  axios.defaults.baseURL = "https://api.avabot.sotatek.works";

  const method = "POST";
  const apiPath = "/api/backend/user-operations/send";
  const apiKey = "tinbot-test-api"; // TODO: add apiKey, e.g. api-key
  const secretKey = "tinbot-secret-key"; // TODO: add secretKey, e.g. secret-key

  const iface = new Interface(avabot_router_abi);
  // encode data
  const encodedData = iface.encodeFunctionData("buy", [
    "0x8d008B313C1d6C7fE2982F62d32Da7507cF43551", // token address to buy
    0, // amountOutMin
    0, // tip
    Date.now() + 5 * 60 * 1000, // deadline
    "", // referral
    "", // refId
    2, // dexId, e.g. Uniswap = 1, PANCAKESWAP = 2, TRADER_JOE = 3, RAYDIUM = 4, DYOR = 5, THRUSTER = 6, LAGOM = 7,
  ]);

  try {
    const bodyData = {
      network: "BSC_TESTNET", // TODO: add network, e.g. "ETH_SEPOLIA", "BSC_TESTNET", "AVALANCHE_TESTNET", "BLAST_SEPOLIA", "SOLANA_DEVNET"
      userId: "6767187788", // TODO: add your userId, e.g. "123456"
      walletAddress: "0x592A175764b362Ee267F3d231Bd8ad1152F11798", // TODO: add wallet address created by your bot
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

    // successful tx: https://jiffyscan.xyz/userOpHash/0xdf6731952aa60b2b7fcfa77b6fc775fbb91c684cefba8dfe17f75cb3dad388eb?network=chapel
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

main();
