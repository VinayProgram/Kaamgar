import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { Database, DATABASE_CONNECTION } from '../db/database-connection.module';
import { alerts } from './schema/schema';
import { jobs } from '../jobs/schema/schema';
import { categories, skills } from '../categories-skills/schema/schema';

@Injectable()
export class AlertsService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: Database
  ) { }

  async createAlert(data: {
    title: string;
    description?: string;
    location: { longitude: number, latitude: number }; // adjust type if you have GeoJSON
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
    // @ts-ignore
    const alert = await this.db.insert(alerts).values({
      ...data,
      location: sql`ST_MakePoint(${data.location.longitude}, ${data.location.latitude})`
    }).returning();

    return alert[0];
  }

  async getAlertById(id: string) {
    return this.db.select().from(alerts).where(eq(alerts.id, id)).execute();
  }

  async getAllAlerts() {
    const alertData = await this.db.select().from(alerts);
    return alertData;
  }

  async getAllPublicAlerts_Jobs() {
    const alertData = await this.db.select().from(alerts).innerJoin(skills, eq(alerts.skillId, skills.id)).innerJoin(categories, eq(alerts.categoryId, categories.id)).where(eq(alerts.active, true));
    const jobsData = await this.db.select().from(jobs).innerJoin(skills, eq(jobs.skillId, skills.id)).innerJoin(categories, eq(jobs.categoryId, categories.id)).where(eq(jobs.isActive, true));
    return [...alertData, ...jobsData];
  }

  async updateAlert(id: string, updates: Partial<typeof alerts.$inferInsert>) {
    return this.db
      .update(alerts)
      .set(updates)
      .where(eq(alerts.id, id))
      .returning()
      .execute();
  }

  async deleteAlert(id: string) {
    return this.db.delete(alerts).where(eq(alerts.id, id)).returning().execute();
  }

  async getAlertsByUserId(userId: string) {
    return await this.db.select().from(alerts).where(eq(alerts.alertBy, userId))
  }
}
