import { z } from 'zod';

export const createPropertyZodSchema = z.object({
  title: z.string().min(2).max(40),
  description: z.string().min(2).max(200),
  price: z.number().min(100000).max(100000000),
  area: z.number().min(1).max(200000),
});

export type CreatePropertyZodSchema = z.infer<typeof createPropertyZodSchema>;
