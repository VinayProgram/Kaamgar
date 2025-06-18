import { pgTable, serial, varchar, integer, unique, primaryKey } from "drizzle-orm/pg-core";

export const kaamgarUsers = pgTable("kaamgar_users", {
  id: serial("id").primaryKey(), // serial for auto-incrementing primary key
  username: varchar("username", { length: 255 }).notNull().unique(), // Renamed 'name' to 'username'
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(), // Added phone number
  aadharNumber: varchar("aadhar_number", { length: 16 }).notNull().unique(), // Added Aadhar Card Number
  panNumber: varchar("pan_number", { length: 10 }).notNull().unique(), // Added PAN Number
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(), // Stores hashed password
});