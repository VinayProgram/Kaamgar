import { pgTable, uuid, text, timestamp, jsonb, geometry, boolean, numeric } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});



export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  location: geometry("location"), // Or handle via raw SQL for PostGIS type.
  address: text("address"),
  pincode: text("pincode"),
  jobDescription: text("job_description"),
  imagedata: jsonb("imagedata"),
  minPrice: numeric("min_price"),
  maxPrice: numeric("max_price"),
  radiustofind: numeric("radiustofind"),
  consumerId: uuid("consumer_id"),
  categoryId: uuid("category_id").references(() => categories.id),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

