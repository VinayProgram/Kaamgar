import * as jwt from "jsonwebtoken";



/**
 * Sign a JWT token with payload.
 * @param payload - Object to encode into JWT
 * @param options - Optional sign options (like expiresIn)
 * @returns Signed JWT string
 */
export function signToken(payload: {},JWT_SECRET:string): string {
  return jwt.sign(payload,JWT_SECRET,{
    expiresIn:7* 24 * 60 * 60, // 7 days
  })
}

/**
 * Verify and decode a JWT token
 * @param token - JWT string to verify
 * @returns Decoded payload if valid, or null if invalid
 */
export function verifyToken<T extends object = any>(token: string,JWT_SECRET:string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (err:any) {
    console.error("JWT verification failed:", (err).message);
    return null;
  }
}
