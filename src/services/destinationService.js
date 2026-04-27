import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";

// CREATE
export const createDestination = async (data, userId) => {
  const { city, country, visitDate, notes, tripId } = data;

  if (!city || !country || !visitDate || !tripId) {
    throw new AppError("Invalid input", 400);
  }

  const trip = await prisma.trip.findUnique({
    where: { id: parseInt(tripId) },
  });

  if (!trip) throw new AppError("Trip not found", 404);

  if (trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return prisma.destination.create({
    data: {
      city,
      country,
      visitDate: new Date(visitDate),
      notes,
      tripId: parseInt(tripId),
    },
  });
};

// GET ALL
export const getDestinations = async (userId) => {
  return prisma.destination.findMany({
    where: {
      trip: { userId },
    },
  });
};

// GET ONE
export const getDestinationById = async (id, userId) => {
  const destination = await prisma.destination.findUnique({
    where: { id: parseInt(id) },
    include: { trip: true },
  });

  if (!destination) throw new AppError("Destination not found", 404);

  if (!destination.trip) {
    throw new AppError("Trip not found for destination", 404);
  }

  if (destination.trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return destination;
};

// UPDATE
export const updateDestination = async (id, data, userId) => {
  const destination = await prisma.destination.findUnique({
    where: { id: parseInt(id) },
    include: { trip: true },
  });

  if (!destination) throw new AppError("Destination not found", 404);

  if (!destination.trip) {
    throw new AppError("Trip not found for destination", 404);
  }

  if (destination.trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return prisma.destination.update({
    where: { id: parseInt(id) },
    data: {
      ...(data.city && { city: data.city }),
      ...(data.country && { country: data.country }),
      ...(data.visitDate && { visitDate: new Date(data.visitDate) }),
      ...(data.notes !== undefined && { notes: data.notes }),
    },
  });
};

// DELETE
export const deleteDestination = async (id, userId) => {
  const destination = await prisma.destination.findUnique({
    where: { id: parseInt(id) },
    include: { trip: true },
  });

  if (!destination) throw new AppError("Destination not found", 404);

  if (!destination.trip) {
    throw new AppError("Trip not found for destination", 404);
  }

  if (destination.trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return prisma.destination.delete({
    where: { id: parseInt(id) },
  });
};