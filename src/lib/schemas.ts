import { MemberRole } from "@/types/memberTypes/type";
import { z } from "zod";

//  LOGIN SCHEMAS
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Field must contain at least 1 characters"),
});

//  SIGN-UP SCHEMAS
export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Field must contain at least 1 character"),
  email: z.string().email(),
  password: z.string().min(8, "Field must contain at least 8 characters"),
});

//  WORKSPACES SCHEMAS
export const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

//  INVITECODE SCHEMAS
export const InviteCodeSchema = z.object({
  code: z.string(),
});

//  MEMBERS SCHEMAS
export const MemberSchema = z.object({
  workspaceId: z.string(),
});

export const MemberIdSchema = z.object({
  role: z.nativeEnum(MemberRole),
});

//  PROJECTS SCHEMAS
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

//  GENERAL SCHEMAS
export const UpdateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
