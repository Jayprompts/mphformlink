import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const createEndpointSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  destinationEmail: z.string().email("Enter a valid email address"),
});

export type CreateEndpointInput = z.infer<typeof createEndpointSchema>;