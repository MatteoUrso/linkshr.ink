"use server";

import { db } from "@/db/drizzle";
import { SelectLink, click, link } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { UAParser } from "ua-parser-js";

export async function createClick(
  linkId: SelectLink["id"],
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

    await db.transaction(async (tx) => {
      // Create a new click
      await tx.insert(click).values({
        linkId,
        browserName,
        browserVersion,
        deviceType,
        operatingSystem,
        userAgent,
      });

      // Increment the click count for the link
      await tx
        .update(link)
        .set({ clicksCount: sql`${link.clicksCount} + 1` })
        .where(eq(link.id, linkId));
    });
  } catch (error) {
    console.error("Error creating click:", error);
    throw error;
  }
}
