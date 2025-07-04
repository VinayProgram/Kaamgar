import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { alerts } from './schema/schema';

@Injectable()
export class AlertsService {
  async createAlert(data: {
    description?: string;
    location?: any; // adjust type if you have GeoJSON
    address?: string;
    pincode?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: string;
    active?: boolean;
    selfDestroy?: boolean;
    alertBy: string;
    alertUserType: string;
  }) {
    return db.insert(alerts).values(data as typeof alerts.$inferInsert).returning();
  }

  async getAlertById(id: string) {
    return db.select().from(alerts).where(eq(alerts.id, id)).execute();
  }

  async getAllAlerts() {
    return await db.select().from(alerts);
  }

  async updateAlert(id: string, updates: Partial<typeof alerts.$inferInsert>) {
    return db
      .update(alerts)
      .set(updates)
      .where(eq(alerts.id, id))
      .returning()
      .execute();
  }

  async deleteAlert(id: string) {
    return db.delete(alerts).where(eq(alerts.id, id)).returning().execute();
  }
}
