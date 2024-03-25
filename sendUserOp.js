import axios from "axios";
import { Interface } from "ethers";
import { generateSignature } from "./generateSignature.js";
import { BASE_API_URL } from "./constant.js";

async function main() {
  const method = ""; // TODO: add method, e.g. "POST"
  const apiPath = ""; // TODO: add path, e.g. "/api/backend/user-operations/send"
  const apiKey = ""; // TODO: add apiKey, e.g. api-key
  const secretKey = ""; // TODO: add secretKey, e.g. secret-key
  const api = `${BASE_API_URL}${apiPath}`;

  const abi = ["function transfer(address to, uint amount)"];
  const iface = new Interface(abi);
  const encodedData = iface.encodeFunctionData("transfer", [
    "0x3438b917f12d674F689DB30D8E3DF209A240288a",
    "1000000000000000",
  ]);

  try {
    const bodyData = {
      network: "", // TODO: add network, e.g. "BSC_TESTNET"
      userId: "", // TODO: add userId, e.g. "123"
      walletAddress: "", // TODO: add wallet address
      to: "", // TODO: add to address
      data: encodedData,
      value: "", // TODO: add value in wei, e.g. "1000000000000000"
    };
    const signature = generateSignature(method, apiPath, bodyData, secretKey);

    const response = await axios.post(
      api,
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
