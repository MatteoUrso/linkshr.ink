import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// const env = process.env.NODE_ENV || "development";
// const isProduction = env === "production";
// const path = isProduction ? ".env.production" : ".env.development";
config({ path: ".env" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
