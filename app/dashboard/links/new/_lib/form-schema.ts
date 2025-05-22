import { LINK_CONSTRAINTS } from "@/lib/constants";
// import { addYears } from "date-fns";
import { z } from "zod";

export const FormSchema = z.object({
  originalUrl: z
    .string()
    .min(1, { message: "Destination URL is required" })
    .url({ message: "Please enter a valid URL including http:// or https://" }),
  backHalf: z
    .string()
    .max(LINK_CONSTRAINTS.BACKHALF_MAX_LENGTH, {
      message: `Back-half must be at most ${LINK_CONSTRAINTS.BACKHALF_MAX_LENGTH} characters long`,
    })
    .regex(LINK_CONSTRAINTS.BACKHALF_REGEX, {
      message: `Back-half can only contain letters, numbers, and underscores`,
    })
    .optional()
    .or(
      // Allow empty string to be transformed to undefined
      z.literal("")
    )
    .transform((val) => (val === "" ? undefined : val)), // Transform empty string to undefined
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(LINK_CONSTRAINTS.TITLE_MAX_LENGTH, {
      message: `Title must be at most ${LINK_CONSTRAINTS.TITLE_MAX_LENGTH} characters long`,
    }),

  // Security & Expiration
  // expiration_date: z
  //   .date({
  //     required_error: "Expiration date is required",
  //     invalid_type_error: "Expiration date must be a valid date",
  //   })
  //   .min(new Date(), {
  //     message: "Expiration date must be in the future",
  //   })
  //   .max(addYears(new Date(), LINK_CONSTRAINTS.MAX_EXPIRATION_YEARS), {
  //     message: `Expiration date must be within ${LINK_CONSTRAINTS.MAX_EXPIRATION_YEARS} years from now`,
  //   })
  //   .optional()
  //   .nullable(),

  // UTM Parameters
  utmSource: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_SOURCE_MAX_LENGTH, {
      message: `UTM Source must be at most ${LINK_CONSTRAINTS.UTM_SOURCE_MAX_LENGTH} characters long`,
    })
    .optional()
    .transform((val) => (val === "" ? undefined : val)), // Transform empty string to undefined
  utmMedium: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_MEDIUM_MAX_LENGTH, {
      message: `UTM Medium must be at most ${LINK_CONSTRAINTS.UTM_MEDIUM_MAX_LENGTH} characters long`,
    })
    .optional()
    .transform((val) => (val === "" ? undefined : val)), // Transform empty string to undefined
  utmCampaign: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_CAMPAIGN_MAX_LENGTH, {
      message: `UTM Campaign must be at most ${LINK_CONSTRAINTS.UTM_CAMPAIGN_MAX_LENGTH} characters long`,
    })
    .optional()
    .transform((val) => (val === "" ? undefined : val)), // Transform empty string to undefined
  utmContent: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_CONTENT_MAX_LENGTH, {
      message: `UTM Content must be at most ${LINK_CONSTRAINTS.UTM_CONTENT_MAX_LENGTH} characters long`,
    })
    .optional()
    .transform((val) => (val === "" ? undefined : val)), // Transform empty string to undefined
  utmTerm: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_TERM_MAX_LENGTH, {
      message: `UTM Term must be at most ${LINK_CONSTRAINTS.UTM_TERM_MAX_LENGTH} characters long`,
    })
    .optional()
    .transform((val) => (val === "" ? undefined : val)), // Transform empty string to undefined
});
