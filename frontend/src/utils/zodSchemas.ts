import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(10, { message: "Password should be at least 10 characters long" }),
  remember_me: z.boolean().optional(),
});

export type LoginType = z.infer<typeof loginSchema>

export const recoverSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type RecoverType = z.infer<typeof recoverSchema>