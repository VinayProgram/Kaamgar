import { pgTable, uuid, text, numeric, boolean, timestamp, geometry } from "drizzle-orm/pg-core";
import { categories } from "src/jobs/schema/schema";


export const alerts = pgTable("alerts", {
  id: uuid("id").primaryKey().defaultRandom(),
  description: text("description"),
  location: geometry("location"), // Replace with GEOMETRY via raw SQL if needed
  address: text("address"),
  pincode: text("pincode"),
  minPrice: numeric("min_price"),
  maxPrice: numeric("max_price"),
  categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
  active: boolean("active").default(true),
  selfDestroy: boolean("self_destroy").default(false),
  createdDate: timestamp("created_date").defaultNow(),
  alertBy: uuid("alert_by"),
  alertUserType: text("alert_user_type").notNull(), // Example: 'consumer' | 'worker'
});
