ALTER TABLE "link" DROP CONSTRAINT "link_short_code_unique";--> statement-breakpoint
ALTER TABLE "link" ADD COLUMN "back_half" text NOT NULL;--> statement-breakpoint
ALTER TABLE "link" ADD COLUMN "link_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "link" ADD COLUMN "has_custom_back_half" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "link" DROP COLUMN "short_code";--> statement-breakpoint
ALTER TABLE "link" DROP COLUMN "has_short_code_custom";--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_back_half_unique" UNIQUE("back_half");--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_link_url_unique" UNIQUE("link_url");