import {categories,jobs,skills} from '../../jobs/schema/schema'
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { db } from '../../db';


export const seedData = async () => {
  try {
    // 1. Seed categories
    const categoriesData = [
      { id: randomUUID(), name: 'Plumbing', description: 'All plumbing services' },
      { id: randomUUID(), name: 'Electrical', description: 'Electrical repair and installation' },
      { id: randomUUID(), name: 'Cleaning', description: 'Home and office cleaning services' },
    ];

    await db.insert(categories).values(categoriesData).onConflictDoNothing();

    // 2. Seed skills
    const skillsData = [
      { id: randomUUID(), name: 'Pipe Fitting', description: 'Installing and repairing pipes' },
      { id: randomUUID(), name: 'Circuit Repair', description: 'Fixing circuits and wiring' },
      { id: randomUUID(), name: 'Deep Cleaning', description: 'Intensive cleaning work' },
    ];

    await db.insert(skills).values(skillsData).onConflictDoNothing();

    // 3. Get category ID for jobs
    const categoryRecord = await db
      .select()
      .from(categories)
      .where(eq(categories.name, 'Plumbing'))
      .execute();

    const categoryId = categoryRecord[0]?.id ?? categoriesData[0].id;

    // 4. Seed jobs — handle PostGIS POINT via raw SQL
    const jobId = randomUUID();
    const consumerId = randomUUID();

    await db.execute(
      `
      INSERT INTO jobs (
        id,
        location,
        address,
        pincode,
        job_description,
        imagedata,
        min_price,
        max_price,
        radiustofind,
        consumer_id,
        category_id,
        status,
        is_active
      ) VALUES (
        $1,
        ST_SetSRID(ST_MakePoint($2, $3), 4326),
        $4,
        $5,
        $6::jsonb,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14
      )
      ON CONFLICT DO NOTHING
      `,
      [
        jobId, // This was missing as $1
        77.5946,  // lng ($2)
        12.9716,  // lat ($3)
        '123 Main Street, Bangalore', // ($4)
        '560001', // ($5)
        'Fix leaking pipe in kitchen', // ($6)
        JSON.stringify({ images: ['pipe1.jpg', 'pipe2.jpg'] }), // ($7)
        500, // ($8)
        1500, // ($9)
        10, // ($10)
        consumerId, // ($11)
        categoryId, // ($12)
        'open', // ($13)
        true, // ($14)
      ]
    );

    console.log('✅ Seeded categories, skills, and jobs!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
};