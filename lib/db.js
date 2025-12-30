/**
 * lib/db.js
 * Lazy-initialize Prisma Client to avoid top-level require during Vercel build.
 */
let prismaInstance = null

function getPrisma() {
  if (prismaInstance) return prismaInstance
  try {
    const { PrismaClient } = require('@prisma/client')
    prismaInstance = new PrismaClient()
    return prismaInstance
  } catch (err) {
    // Prisma client is not available (e.g. not generated during build). Return null so callers can guard.
    console.warn('Prisma client not available:', err?.message || err)
    return null
  }
}

module.exports = { getPrisma }
