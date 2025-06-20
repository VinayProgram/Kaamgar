import { pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// Enums
export const userVerificationStatus = pgEnum("user_verification_status", ["pending", "verified", "rejected"]);
export const userType = pgEnum("user_type", ["regular", "professional"]);

// Table
export const kaamgarUsers = pgTable("kaamgar_users", {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  username: varchar("username", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
  aadharNumber: varchar("aadhar_number", { length: 16 }).notNull().unique(),
  panNumber: varchar("pan_number", { length: 10 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),

  isVerified: userVerificationStatus("is_verified").notNull().default("pending"),
  userType: userType("user_type").notNull().default("regular"),
});
