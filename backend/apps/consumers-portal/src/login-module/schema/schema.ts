// drizzle/schema/users.ts

import { pgTable, serial, uuid, text, timestamp, varchar, uniqueIndex, index } from "drizzle-orm/pg-core";

export const consumers = pgTable(
  "consumers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).unique().notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at"),
  },
    (table) => [
        uniqueIndex("idx_email").on(table.email),
        uniqueIndex("idx_phone_number").on(table.phoneNumber),
        index("idx_created_at").on(table.createdAt),
        index("idx_updated_at").on(table.updatedAt),
    ]
);
