import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Field must contain at least 1 characters"),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Field must contain at least 1 character"),
  email: z.string().email(),
  password: z.string().min(8, "Field must contain at least 8 characters"),
});
