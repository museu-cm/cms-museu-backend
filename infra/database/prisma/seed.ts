import { User, Role, Situation, PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createDefaultUsers = async (salt: string) => {
  const users = [
    {
      name: 'Administrador',
      username: 'admin',
      email: 'admin@admin.com',
      password: await bcrypt.hash('adminpassword', salt),
      role: Role.ADMIN,
      situation: Situation.ACTIVE
    },
  ];

  await prisma.user.createMany({
    data: users
  })
}

async function seed() {
  if (process.env.SALT) {
    const salt = process.env.SALT;
    await createDefaultUsers(salt);
  } else {
    throw new Error("SALT env not found");
  }
}

seed()
  .then(() =>
    console.log('\n[Prisma] database seeded successfully')
  )
  .catch((e) => {
    console.log('\n[Prisma] Error on seed database')
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });