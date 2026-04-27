import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const hash = (pwd) => bcrypt.hash(pwd, 10);

async function main() {
  console.log("🌱 CLEAN FULL SEED START");

  await prisma.activity.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  // USERS
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
  const trip1 = await prisma.trip.create({
    data: {
      title: "Europe Trip",
      startDate: new Date("2026-07-01"),
      endDate: new Date("2026-07-10"),
      budget: 5000,
      userId: alice.id,
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      title: "Asia Trip",
      startDate: new Date("2026-08-01"),
      endDate: new Date("2026-08-10"),
      budget: 3000,
      userId: bob.id,
    },
  });

  const trip3 = await prisma.trip.create({
    data: {
      title: "USA Trip",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-09-10"),
      budget: 4000,
      userId: charlie.id,
    },
  });

  // DESTINATIONS
  const dest1 = await prisma.destination.create({
    data: {
      city: "Paris",
      country: "France",
      visitDate: new Date("2026-07-03"),
      notes: "Eiffel Tower",
      tripId: trip1.id,
    },
  });

  const dest2 = await prisma.destination.create({
    data: {
      city: "Tokyo",
      country: "Japan",
      visitDate: new Date("2026-08-03"),
      notes: "Shibuya",
      tripId: trip2.id,
    },
  });

  const dest3 = await prisma.destination.create({
    data: {
      city: "New York",
      country: "USA",
      visitDate: new Date("2026-09-03"),
      notes: "Times Square",
      tripId: trip3.id,
    },
  });

  // ACTIVITIES
  await prisma.activity.createMany({
    data: [
      {
        name: "Eiffel Visit",
        description: "Tower tour",
        activityDate: new Date("2026-07-03"),
        activityTime: "10:00",
        estimatedCost: 50,
        destinationId: dest1.id,
      },
      {
        name: "Sushi Class",
        description: "Cooking",
        activityDate: new Date("2026-08-03"),
        activityTime: "11:00",
        estimatedCost: 80,
        destinationId: dest2.id,
      },
      {
        name: "Broadway Show",
        description: "Night show",
        activityDate: new Date("2026-09-03"),
        activityTime: "20:00",
        estimatedCost: 120,
        destinationId: dest3.id,
      },
    ],
  });

  console.log("🌱 FULL SEED DONE");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());