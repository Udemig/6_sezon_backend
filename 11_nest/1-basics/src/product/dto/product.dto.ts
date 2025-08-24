import { z } from 'zod';

export const productZodSchema = z.object({
  name: z.string().min(2).max(40),
  description: z.string().min(2).max(200),
  price: z.number().min(100000).max(100000000),
  stock: z.number().min(1).max(1000),
});

export const headersZodSchema = z.object({
  authorization: z.string().min(5),
});

export type ProductZodSchema = z.infer<typeof productZodSchema>;
export type HeadersZodSchema = z.infer<typeof headersZodSchema>;
