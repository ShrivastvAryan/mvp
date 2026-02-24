import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

console.log("ACCESS_SECRET loaded:", ACCESS_SECRET);
console.log("REFRESH_SECRET loaded:", REFRESH_SECRET);

export const generateAccessToken = (payload: any) => {
  console.log("Generating access token with payload:", payload);
  return jwt.sign(payload, ACCESS_SECRET as string, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (payload: any) => {
  console.log("Generating refresh token with payload:", payload);
  return jwt.sign(payload, REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  console.log("Verifying access token:", token);

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET as string);
    console.log("Access token verified successfully:", decoded);
    return decoded;
  } catch (error) {
    console.error("Access token verification failed:", error);
    throw error;
  }
};

export const verifyRefreshToken = (token: string) => {
  console.log("Verifying refresh token:", token);

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET as string);
    console.log("Refresh token verified successfully:", decoded);
    return decoded;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    throw error;
  }
};