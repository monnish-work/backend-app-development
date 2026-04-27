import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ---------------- CLEAN DB ----------------
  await prisma.activity.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.user.deleteMany();

  // ---------------- USERS ----------------
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@test.com",
        password: "Password123",
      },
    }),
    prisma.user.create({
      data: {
        name: "Bob",
        email: "bob@test.com",
        password: "Password123",
      },
    }),
    prisma.user.create({
      data: {
        name: "Charlie",
        email: "charlie@test.com",
        password: "Password123",
      },
    }),
    prisma.user.create({
      data: {
        name: "David",
        email: "david@test.com",
        password: "Password123",
      },
    }),
    prisma.user.create({
      data: {
        name: "Eve",
        email: "eve@test.com",
        password: "Password123",
      },
    }),
  ]);

  // ---------------- TRIPS ----------------
  const trips = await Promise.all([
    prisma.trip.create({
      data: {
        title: "Europe Trip",
        startDate: new Date("2026-07-01"),
        endDate: new Date("2026-07-10"),
        budget: 5000,
        userId: users[0].id,
      },
    }),
    prisma.trip.create({
      data: {
        title: "Asia Adventure",
        startDate: new Date("2026-08-01"),
        endDate: new Date("2026-08-12"),
        budget: 3000,
        userId: users[1].id,
      },
    }),
    prisma.trip.create({
      data: {
        title: "USA Roadtrip",
        startDate: new Date("2026-09-01"),
        endDate: new Date("2026-09-15"),
        budget: 4000,
        userId: users[2].id,
      },
    }),
    prisma.trip.create({
      data: {
        title: "Middle East Tour",
        startDate: new Date("2026-10-01"),
        endDate: new Date("2026-10-10"),
        budget: 3500,
        userId: users[3].id,
      },
    }),
    prisma.trip.create({
      data: {
        title: "Australia Trip",
        startDate: new Date("2026-11-01"),
        endDate: new Date("2026-11-12"),
        budget: 6000,
        userId: users[4].id,
      },
    }),
  ]);

  // ---------------- DESTINATIONS ----------------
  const destinations = await Promise.all([
    prisma.destination.create({
      data: {
        city: "Paris",
        country: "France",
        visitDate: new Date("2026-07-03"),
        notes: "Eiffel Tower",
        tripId: trips[0].id,
      },
    }),
    prisma.destination.create({
      data: {
        city: "Tokyo",
        country: "Japan",
        visitDate: new Date("2026-08-03"),
        notes: "Shibuya Crossing",
        tripId: trips[1].id,
      },
    }),
    prisma.destination.create({
      data: {
        city: "New York",
        country: "USA",
        visitDate: new Date("2026-09-03"),
        notes: "Times Square",
        tripId: trips[2].id,
      },
    }),
    prisma.destination.create({
      data: {
        city: "Dubai",
        country: "UAE",
        visitDate: new Date("2026-10-03"),
        notes: "Burj Khalifa",
        tripId: trips[3].id,
      },
    }),
    prisma.destination.create({
      data: {
        city: "Sydney",
        country: "Australia",
        visitDate: new Date("2026-11-03"),
        notes: "Opera House",
        tripId: trips[4].id,
      },
    }),
  ]);

  // ---------------- ACTIVITIES ----------------
  await prisma.activity.createMany({
    data: [
      {
        name: "Eiffel Visit",
        description: "Tower tour",
        activityDate: new Date("2026-07-03"),
        activityTime: "10:00",
        estimatedCost: 50,
        destinationId: destinations[0].id,
      },
      {
        name: "Sushi Class",
        description: "Cooking experience",
        activityDate: new Date("2026-08-03"),
        activityTime: "11:00",
        estimatedCost: 80,
        destinationId: destinations[1].id,
      },
      {
        name: "Broadway Show",
        description: "Night show",
        activityDate: new Date("2026-09-03"),
        activityTime: "20:00",
        estimatedCost: 120,
        destinationId: destinations[2].id,
      },
      {
        name: "Desert Safari",
        description: "Dune ride",
        activityDate: new Date("2026-10-03"),
        activityTime: "16:00",
        estimatedCost: 100,
        destinationId: destinations[3].id,
      },
      {
        name: "Harbour Cruise",
        description: "Boat ride",
        activityDate: new Date("2026-11-03"),
        activityTime: "18:00",
        estimatedCost: 90,
        destinationId: destinations[4].id,
      },
    ],
  });

  console.log("🌱 Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });