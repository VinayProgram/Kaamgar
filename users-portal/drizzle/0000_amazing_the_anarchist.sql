CREATE TYPE "public"."user_type" AS ENUM('regular', 'professional');--> statement-breakpoint
CREATE TYPE "public"."user_verification_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TABLE "kaamgar_location" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"location" geometry(point) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "kaamgar_location_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "kaamgar_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"username" varchar(255) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"aadhar_number" varchar(16) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"is_verified" "user_verification_status" DEFAULT 'pending' NOT NULL,
	"user_type" "user_type" DEFAULT 'regular' NOT NULL,
	CONSTRAINT "kaamgar_users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "kaamgar_users_username_unique" UNIQUE("username"),
	CONSTRAINT "kaamgar_users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "kaamgar_users_aadhar_number_unique" UNIQUE("aadhar_number"),
	CONSTRAINT "kaamgar_users_pan_number_unique" UNIQUE("pan_number"),
	CONSTRAINT "kaamgar_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_portfolio" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"data" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_portfolio_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"profile_photo" text,
	"bio" varchar(160),
	"about" text,
	"skills" text[],
	"aadhar_card_url" text,
	"pan_card_url" text,
	"address" text,
	"experience" text,
	"education" text,
	"social_links" jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "kaamgar_location" ADD CONSTRAINT "kaamgar_location_user_id_kaamgar_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."kaamgar_users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_portfolio" ADD CONSTRAINT "user_portfolio_user_id_kaamgar_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."kaamgar_users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_kaamgar_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."kaamgar_users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_location_user_id" ON "kaamgar_location" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_location_geom" ON "kaamgar_location" USING gist ("location");--> statement-breakpoint
CREATE INDEX "idx_is_active" ON "kaamgar_users" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_is_available" ON "kaamgar_users" USING btree ("is_available");--> statement-breakpoint
CREATE INDEX "idx_user_type" ON "kaamgar_users" USING btree ("user_type");--> statement-breakpoint
CREATE INDEX "idx_is_verified" ON "kaamgar_users" USING btree ("is_verified");--> statement-breakpoint
CREATE INDEX "idx_available_active" ON "kaamgar_users" USING btree ("is_available","is_active");--> statement-breakpoint
CREATE INDEX "idx_portfolio_user_id" ON "user_portfolio" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_profiles_user_id" ON "user_profiles" USING btree ("user_id");