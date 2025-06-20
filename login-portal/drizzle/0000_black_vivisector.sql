CREATE TYPE "public"."user_type" AS ENUM('regular', 'professional');--> statement-breakpoint
CREATE TYPE "public"."user_verification_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TABLE "kaamgar_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"aadhar_number" varchar(16) NOT NULL,
	"pan_number" varchar(10) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"is_verified" "user_verification_status" DEFAULT 'pending' NOT NULL,
	"user_type" "user_type" DEFAULT 'regular' NOT NULL,
	CONSTRAINT "kaamgar_users_username_unique" UNIQUE("username"),
	CONSTRAINT "kaamgar_users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "kaamgar_users_aadhar_number_unique" UNIQUE("aadhar_number"),
	CONSTRAINT "kaamgar_users_pan_number_unique" UNIQUE("pan_number"),
	CONSTRAINT "kaamgar_users_email_unique" UNIQUE("email")
);
