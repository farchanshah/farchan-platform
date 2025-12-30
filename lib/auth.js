// lib/auth.js
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'please-change-me-very-strong'

function signToken(payload, opts = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: opts.expiresIn || '7d' })
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

// helpers for cookie header set
function setAuthCookie(res, token) {
  // assuming Next Response not used for cookie helper; we return cookie string
  const cookie = `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
  return cookie
}

module.exports = { signToken, verifyToken, setAuthCookie }
