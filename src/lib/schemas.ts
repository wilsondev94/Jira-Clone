import { MemberRole } from "@/types/memberTypes/type";
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

export const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const UpdateworkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must be at least 1 character")
    .optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

export const InviteCodeSchema = z.object({
  code: z.string(),
});

export const MemberSchema = z.object({
  workspaceId: z.string(),
});

export const MemberIdSchema = z.object({
  role: z.nativeEnum(MemberRole),
});

export const projectsSchema = z.object({
  workspaceId: z.string(),
});

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must be at least 1 character")
    .optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  workspaceId: z.string(),
});
