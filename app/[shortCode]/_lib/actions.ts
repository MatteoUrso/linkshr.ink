"use server";

import { db } from "@/db/drizzle";
import { click, link } from "@/db/schema";
import { UAParser } from "ua-parser-js";

type Link = typeof link.$inferSelect;
export async function createClick(
  linkId: Link["id"],
  userAgent: string | null
): Promise<void> {
  try {
    let browserName: string | undefined = undefined;
    let browserVersion: string | undefined = undefined;
    let deviceType:
      | "mobile"
      | "tablet"
      | "console"
      | "smarttv"
      | "wearable"
      | "xr"
      | "embedded"
      | undefined = undefined;
    let operatingSystem: string | undefined = undefined;
    if (userAgent) {
      const { browser, device, os } = UAParser(userAgent);
      browserName = browser.name;
      browserVersion = browser.version;
      deviceType = device.type;
      operatingSystem = os.name;
    }
    await db.insert(click).values({
      linkId,
      browserName,
      browserVersion,
      deviceType,
      operatingSystem,
      userAgent,
    });
  } catch (error) {
    console.error("Error creating click:", error);

    // TODO: Handle error appropriately in production

    throw error;
  }
}
