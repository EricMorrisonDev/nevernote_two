import { z } from "zod"

const passwordSchema = z.string().min(8, "Password must be at least 8 characters")

export const loginSchema = z.object({
    email: z.email(),
    password: passwordSchema,
    confirmPassword: z.string()
})

export const signupSchema = z.object({
    userName: z.string(),
    email: z.email(),
    password: passwordSchema,
    confirmPassword: z.string()
})