const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@farchan.local'
  const adminPassword = process.env.ADMIN_PASSWORD || 'supersecurepassword'
  const hash = await bcrypt.hash(adminPassword, 10)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hash,
      role: 'ADMIN'
    }
  })

  console.log('Seed finished')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
