import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from "fs";
import path, {dirname} from 'path';
import {fileURLToPath} from "url";

dotenv.config();


export default function issueJWT(user) {
  const email = user.email;
  const password = user.password
  const user_id = user.user_id;
  const expiresIn = "1d";
  // Building key path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const pathToKey = path.join(__dirname, '..', 'PRIV_KEY.pem');
  const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

  const payload = {
    sub: email,
    password: password,
    user_id: user_id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
