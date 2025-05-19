import { LINK_CONSTRAINTS } from "./constants";
// import { addYears } from "date-fns";
import { z } from "zod";

export const FormSchema = z.object({
  original_url: z
    .string()
    .min(1, { message: "Original URL is required" })
    .url({ message: "Please enter a valid URL including http:// or https://" }),
  short_code: z
    .string()
    .max(LINK_CONSTRAINTS.SHORTCODE_MAX_LENGTH, {
      message: `Short code must be at most ${LINK_CONSTRAINTS.SHORTCODE_MAX_LENGTH} characters long`,
    })
    .regex(LINK_CONSTRAINTS.SHORTCODE_REGEX, {
      message: `Short code can only contain letters, numbers, and underscores`,
    })
    .optional()
    .or(z.literal("")), // Allow empty string
  title: z
    .string()
    .max(LINK_CONSTRAINTS.TITLE_MAX_LENGTH, {
      message: `Title must be at most ${LINK_CONSTRAINTS.TITLE_MAX_LENGTH} characters long`,
    })
    .optional(),

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
  utm_source: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_SOURCE_MAX_LENGTH, {
      message: `UTM Source must be at most ${LINK_CONSTRAINTS.UTM_SOURCE_MAX_LENGTH} characters long`,
    })
    .optional(),
  utm_medium: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_MEDIUM_MAX_LENGTH, {
      message: `UTM Medium must be at most ${LINK_CONSTRAINTS.UTM_MEDIUM_MAX_LENGTH} characters long`,
    })
    .optional(),
  utm_campaign: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_CAMPAIGN_MAX_LENGTH, {
      message: `UTM Campaign must be at most ${LINK_CONSTRAINTS.UTM_CAMPAIGN_MAX_LENGTH} characters long`,
    })
    .optional(),
  utm_content: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_CONTENT_MAX_LENGTH, {
      message: `UTM Content must be at most ${LINK_CONSTRAINTS.UTM_CONTENT_MAX_LENGTH} characters long`,
    })
    .optional(),
  utm_term: z
    .string()
    .max(LINK_CONSTRAINTS.UTM_TERM_MAX_LENGTH, {
      message: `UTM Term must be at most ${LINK_CONSTRAINTS.UTM_TERM_MAX_LENGTH} characters long`,
    })
    .optional(),
});
