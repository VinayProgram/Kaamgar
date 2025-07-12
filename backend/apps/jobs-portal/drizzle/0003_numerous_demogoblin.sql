ALTER TABLE "jobs" RENAME COLUMN "job_description" TO "description";--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "skill_id" uuid;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE no action ON UPDATE no action;