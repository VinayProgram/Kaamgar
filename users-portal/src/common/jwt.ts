import * as jwt from "jsonwebtoken";

const JWT_SECRET =  "your_default_secret_key" // Load from env in production

/**
 * Sign a JWT token with payload.
 * @param payload - Object to encode into JWT
 * @param options - Optional sign options (like expiresIn)
 * @returns Signed JWT string
 */
export function signToken(payload: {}): string {
  return jwt.sign(payload,JWT_SECRET,{
    expiresIn:7
  })
}

/**
 * Verify and decode a JWT token
 * @param token - JWT string to verify
 * @returns Decoded payload if valid, or null if invalid
 */
export function verifyToken<T extends object = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (err) {
    console.error("JWT verification failed:", (err).message);
    return null;
  }
}
