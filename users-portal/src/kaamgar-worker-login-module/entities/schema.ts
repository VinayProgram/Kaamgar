import { pgEnum, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

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


export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  
  userId: uuid("user_id").notNull().unique(), // Link to auth table (foreign key if needed)
  
  profilePhoto: text("profile_photo"), // URL
  bio: varchar("bio", { length: 160 }),
  about: text("about"),

  skills: text("skills").array(), // TEXT[] — max 5 items client-side limited

  aadharCardUrl: text("aadhar_card_url"),
  panCardUrl: text("pan_card_url"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
