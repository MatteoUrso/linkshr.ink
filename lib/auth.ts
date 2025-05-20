import { db } from "@/db/drizzle";
import { USER_CONSTRAINTS } from "@/lib/constants";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { haveIBeenPwned } from "better-auth/plugins";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    // https://www.better-auth.com/docs/plugins/have-i-been-pwned
    haveIBeenPwned({
      customPasswordCompromisedMessage: "Please choose a more secure password.",
    }),
    // https://www.better-auth.com/docs/plugins/admin
    admin(),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      // Check max length of name
      if (ctx.body?.name.length > USER_CONSTRAINTS.NAME_MAX_LENGTH) {
        throw new APIError("BAD_REQUEST", {
          message: `Name must be at most ${USER_CONSTRAINTS.NAME_MAX_LENGTH} characters`,
          code: "NAME_TOO_LONG",
        });
      }
    }),
  },
});
