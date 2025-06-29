CREATE TABLE "consumers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "consumers_email_unique" UNIQUE("email"),
	CONSTRAINT "consumers_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "idx_email" ON "consumers" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_phone_number" ON "consumers" USING btree ("phone_number");--> statement-breakpoint
CREATE INDEX "idx_created_at" ON "consumers" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_updated_at" ON "consumers" USING btree ("updated_at");