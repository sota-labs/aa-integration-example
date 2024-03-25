import * as crypto from "crypto";

export function generateSignature(method, path, body, secretKey) {
  const signatureData = method + path + JSON.stringify(body);
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(signatureData);
  const signature = hmac.digest("hex");

  return signature;
}

async function main() {
  const method = ""; // TODO: add method, e.g. "POST"
  const path = ""; // TODO: add path, e.g. "/api/backend/wallets/generate"
  const body = {}; // TODO: add body, e.g. {type: 1,userId: "6407283661"}
  const secretKey = ""; // TODO: add secretKey, e.g. secret-key

  const signature = generateSignature(method, path, body, secretKey);

  console.log("signature", signature);
}

main();
