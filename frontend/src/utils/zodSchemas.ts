import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password should be at least 5 characters long" }),
  remember_me: z.boolean().optional(),
});

export const SignupsSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  first_name: z.string().refine(value => value.trim() !== '', {message: "Fill in your first name"}),
  last_name: z.string().refine(value => value.trim() !== '', {message: "Fill in your first name"}),  
  password: z
  .string()
  .min(10, { message: "Password should be at least 10 characters long" }),
remember_me: z.boolean().optional(),
})

export type LoginType = z.infer<typeof loginSchema>;
export type SignupType = z.infer<typeof  SignupsSchema>

export const recoverSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type RecoverType = z.infer<typeof recoverSchema>;

export const recoverCodeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Code should be at least 6 characters long" }),
});

export type RecoverCodeType = z.infer<typeof recoverCodeSchema>;

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(10, { message: "Password should be at least 10 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type NewPasswordType = z.infer<typeof newPasswordSchema>;
