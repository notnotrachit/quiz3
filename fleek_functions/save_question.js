// var jwt = require("jsonwebtoken");
import { Buffer } from "node:buffer";
import verify from "./node_modules/jsonwebtoken/index.js";
const b64publicKey = "";
const publicKey = Buffer.from(b64publicKey, "base64").toString("utf-8");




export const main = async (params) => {
  const { body } = params;
  const decodedToken = verify(body.token, publicKey);
  return decodedToken;
};

// main({ method: "GET", path: "/question" }).then(console.log);
