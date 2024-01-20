import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(30),
});

export const ForgetSchema =z.object({
    email: z.string().email('Invalid email'),
})

export const ResetPasswordSchema = z
.object({
  password: z.string().min(6, 'Password must be at least 6 characters').max(30),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters').max(30),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], 
});