import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const hash = (pwd) => bcrypt.hash(pwd, 10);

async function main() {
  console.log("🌱 CLEAN SEED START");

  await prisma.activity.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  // USERS (SEQUENTIAL = NO CONFUSION)
  const alice = await prisma.user.create({
    data: { name: "Alice", email: "alice@test.com", password: await hash("Password123") }
  });

  const bob = await prisma.user.create({
    data: { name: "Bob", email: "bob@test.com", password: await hash("Password123") }
  });

  const charlie = await prisma.user.create({
    data: { name: "Charlie", email: "charlie@test.com", password: await hash("Password123") }
  });

  const david = await prisma.user.create({
    data: { name: "David", email: "david@test.com", password: await hash("Password123") }
  });

  const eve = await prisma.user.create({
    data: { name: "Eve", email: "eve@test.com", password: await hash("Password123") }
  });

  // TRIPS
  await prisma.trip.create({
    data: {
      title: "Europe Trip",
      startDate: new Date("2026-07-01"),
      endDate: new Date("2026-07-10"),
      budget: 5000,
      userId: alice.id,
    },
  });

  await prisma.trip.create({
    data: {
      title: "Asia Trip",
      startDate: new Date("2026-08-01"),
      endDate: new Date("2026-08-10"),
      budget: 3000,
      userId: bob.id,
    },
  });

  await prisma.trip.create({
    data: {
      title: "USA Trip",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-09-10"),
      budget: 4000,
      userId: charlie.id,
    },
  });

  console.log("🌱 CLEAN SEED DONE");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());