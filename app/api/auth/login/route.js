// app/api/auth/login/route.js
import bcrypt from 'bcrypt'
import { headers } from 'next/headers'

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password } = body || {}
    if (!email || !password) return new Response(JSON.stringify({ error: 'Missing' }), { status: 400 })

    const { getPrisma } = require('../../../lib/db')
    const prisma = getPrisma()
    if (!prisma) return new Response(JSON.stringify({ error: 'DB not available' }), { status: 500 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })

    const { signToken } = require('../../../lib/auth')
    const token = signToken({ id: user.id, role: user.role })

    const cookie = `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60*60*24*7}`
    const res = new Response(JSON.stringify({ ok: true }), { status: 200 })
    res.headers.append('Set-Cookie', cookie)
    return res
  } catch (e) {
    console.error('Login error', e)
    return new Response(JSON.stringify({ error: 'internal' }), { status: 500 })
  }
}
