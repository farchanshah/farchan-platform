// lib/db.js
// Lazy-initialize Prisma client and cache globally to avoid build-time init issues.

let _prisma = null

function getPrisma() {
  if (_prisma) return _prisma
  try {
    const { PrismaClient } = require('@prisma/client')
    _prisma = new PrismaClient()
    return _prisma
  } catch (err) {
    // Prisma client may not be available during some build steps; return null and let callers guard.
    console.warn('Prisma client not available:', err?.message || err)
    return null
  }
}

module.exports = { getPrisma }
