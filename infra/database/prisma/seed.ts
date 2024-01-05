import { CompanyTable, PermissionTable, PrismaClient, Role, UserTable } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createDefaultUsers = async (salt: string) => {
  const users = [
    {
      name: 'admin',
      email: 'admin@admin.com',
      password: await bcrypt.hash('adminpassword', salt),
      isAdmin: false
    },
  ];

  await prisma.userTable.createMany({
    data: users
  });
}

const createDefaultCompanies = async () => {
  const companies = [
    {
      name: "Cooabiel Cooperativa"
    }
  ];

  await prisma.companyTable.createMany({
    data: companies
  });
}

const createDefaultPermissions = async () => {
  const permissions = [
    {
      userId: 1,
      companyId: 1,
      role: Role.ADMIN
    },
  ]

  await prisma.permissionTable.createMany({
    data: permissions
  })
}

async function seed() {
  if (process.env.SALT) {
    const salt = process.env.SALT;
    await createDefaultUsers(salt);
    await createDefaultCompanies();
    await createDefaultPermissions();
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