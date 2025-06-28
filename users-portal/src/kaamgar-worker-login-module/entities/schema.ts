import { sql } from "drizzle-orm";
import {
  boolean,
  geometry,
  index,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Enums
export const userVerificationStatus = pgEnum("user_verification_status", [
  "pending",
  "verified",
  "rejected",
]);
export const userType = pgEnum("user_type", ["regular", "professional"]);

// kaamgar_users table
export const kaamgarUsers = pgTable(
  "kaamgar_users",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").notNull().unique(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
    aadharNumber: varchar("aadhar_number", { length: 16 }).notNull().unique(),
    panNumber: varchar("pan_number", { length: 10 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    isAvailable: boolean("is_available").notNull().default(true),
    isVerified: userVerificationStatus("is_verified")
      .notNull()
      .default("pending"),
    userType: userType("user_type").notNull().default("regular"),
  },
  (t) => [
    index("idx_is_active").on(t.isActive),
    index("idx_is_available").on(t.isAvailable),
    index("idx_user_type").on(t.userType),
    index("idx_is_verified").on(t.isVerified),
    index("idx_available_active").on(t.isAvailable, t.isActive),
  ]
);

// user_profiles table
export const userProfiles = pgTable(
  "user_profiles",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => kaamgarUsers.userId),  // ✅ FK to kaamgar_users.id
    profilePhoto: text("profile_photo"),
    bio: varchar("bio", { length: 160 }),
    about: text("about"),
    skills: text("skills").array(),
    aadharCardUrl: text("aadhar_card_url"),
    panCardUrl: text("pan_card_url"),
    address: text("address"),
    experience: text("experience"),
    education: text("education"),
    socialLinks: jsonb("social_links"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_profiles_user_id").on(t.userId)]
);


// user_portfolio table
export const userPortfolio = pgTable(
  "user_portfolio",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => kaamgarUsers.userId),  // ✅ FK to kaamgar_users.id
    data: jsonb("data").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_portfolio_user_id").on(t.userId)]
);


// kaamgar_location table
export const kaamgarLocation = pgTable(
  "kaamgar_location",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").notNull().unique().references(() => kaamgarUsers.userId),
    location: geometry("location", { type: "point", srid: 4326 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("idx_location_user_id").on(t.userId),
    index("idx_location_geom").using("gist", t.location),
  ]
);
