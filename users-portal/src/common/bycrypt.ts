import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashes a string using bcrypt
 * @param plainText - the string to hash
 * @returns hashed string
 */
export async function hashString(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plainText, salt);
}

/**
 * Compares a plain string with a hashed string
 * @param plainText - original string
 * @param hashedText - hashed string
 * @returns true if match, else false
 */
export async function compareHash(plainText: string, hashedText: string): Promise<boolean> {
  return bcrypt.compare(plainText, hashedText);
}
