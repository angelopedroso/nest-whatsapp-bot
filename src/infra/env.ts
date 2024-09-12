import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3333),
})

export type ENV = z.infer<typeof envSchema>
