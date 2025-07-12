import { pgTable, uuid, text, geometry, numeric, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { categories } from "../../categories-skills/schema/schema";



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

