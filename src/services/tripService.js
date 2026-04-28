import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";

// --------------------
// helper
// --------------------
const parseId = (value, fieldName) => {
  const id = parseInt(value);
  if (isNaN(id)) {
    throw new AppError(`Invalid ${fieldName}`, 400);
  }
  return id;
};

// --------------------
// CREATE TRIP
// --------------------
export const createTrip = async (data, userId) => {
  const { title, startDate, endDate, budget } = data;

  if (!title || !startDate || !endDate || budget === undefined) {
    throw new AppError("Invalid input", 400);
  }

  const parsedStart = new Date(startDate);
  const parsedEnd = new Date(endDate);

  if (isNaN(parsedStart) || isNaN(parsedEnd)) {
    throw new AppError("Invalid date format", 400);
  }

  return prisma.trip.create({
    data: {
      title,
      startDate: parsedStart,
      endDate: parsedEnd,
      budget: parseFloat(budget),
      userId,
    },
  });
};

// --------------------
// GET ALL TRIPS
// --------------------
export const getTrips = async (userId) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  return prisma.trip.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "desc",
    },
  });
};

// --------------------
// GET TRIP BY ID
// --------------------
export const getTripById = async (id, userId) => {
  const tripId = parseId(id, "tripId");

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!trip) throw new AppError("Trip not found", 404);

  if (trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return trip;
};

// --------------------
// UPDATE TRIP
// --------------------
export const updateTrip = async (id, data, userId) => {
  const tripId = parseId(id, "tripId");

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!trip) throw new AppError("Trip not found", 404);

  if (trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const updateData = {};

  if (data.title !== undefined) updateData.title = data.title;

  if (data.startDate !== undefined) {
    const parsed = new Date(data.startDate);
    if (isNaN(parsed)) throw new AppError("Invalid startDate", 400);
    updateData.startDate = parsed;
  }

  if (data.endDate !== undefined) {
    const parsed = new Date(data.endDate);
    if (isNaN(parsed)) throw new AppError("Invalid endDate", 400);
    updateData.endDate = parsed;
  }

  if (data.budget !== undefined) {
    const parsed = parseFloat(data.budget);
    if (isNaN(parsed)) throw new AppError("Invalid budget", 400);
    updateData.budget = parsed;
  }

  if (Object.keys(updateData).length === 0) {
    throw new AppError("No valid fields to update", 400);
  }

  return prisma.trip.update({
    where: { id: tripId },
    data: updateData,
  });
};

// --------------------
// DELETE TRIP
// --------------------
export const deleteTrip = async (id, userId) => {
  const tripId = parseId(id, "tripId");

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!trip) throw new AppError("Trip not found", 404);

  if (trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  await prisma.trip.delete({
    where: { id: tripId },
  });

  // ❌ no return
};