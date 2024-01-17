import { z } from "zod";

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const fullName = z
  .string()
  .min(2, { message: "Name must be at least 2 characters." })
  .transform((str) => str.toLowerCase().trim());

export const username = z
  .string()
  .min(2, { message: "Name must be at least 2 characters." })
  .transform((str) => str.toLowerCase().trim());

export const website = z
  .string()
  .min(2, { message: "Website must be at least 2 characters." })
  .transform((str) => str.toLowerCase().trim());

export const updateProfile = z.object({
  email,
  fullName,
  username,
  website,
});
