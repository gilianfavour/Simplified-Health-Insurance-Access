import 'server-only'

/**
 * Database client placeholder.
 *
 * Replace this with your ORM of choice, for example:
 *
 *   Prisma:   import { PrismaClient } from '@prisma/client'
 *             const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 *             export const db = globalForPrisma.prisma ?? new PrismaClient()
 *             if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
 *
 *   Drizzle:  import { drizzle } from 'drizzle-orm/node-postgres'
 *             import { Pool } from 'pg'
 *             const pool = new Pool({ connectionString: process.env.DATABASE_URL })
 *             export const db = drizzle(pool)
 */
export const db = null // TODO: replace with your database client
