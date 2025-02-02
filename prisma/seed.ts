import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.exchange_Rate.createMany({
    data: [
      { rate: 53.0, createdAt: new Date('2025-01-01T00:00:00Z') },
      { rate: 54.0, createdAt: new Date('2025-01-02T00:00:00Z') },
      { rate: 55.0, createdAt: new Date('2025-01-03T00:00:00Z') },
      { rate: 56.0, createdAt: new Date('2025-01-04T00:00:00Z') },
      { rate: 57.0, createdAt: new Date('2025-01-05T00:00:00Z') },
      { rate: 58.0, createdAt: new Date('2025-01-06T00:00:00Z') },
      { rate: 59.0, createdAt: new Date('2025-01-07T00:00:00Z') },
      { rate: 60.0, createdAt: new Date('2025-01-08T00:00:00Z') },
      { rate: 61.0, createdAt: new Date('2025-01-09T00:00:00Z') },
      { rate: 62.0, createdAt: new Date('2025-01-10T00:00:00Z') },
    ],
  });

  console.log('Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });