import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";

// CREATE
export const createActivity = async (data, userId) => {
  const {
    name,
    description,
    activityDate,
    activityTime,
    estimatedCost,
    destinationId,
  } = data;

  if (!name || !activityDate || !activityTime || estimatedCost === undefined || !destinationId) {
    throw new AppError("Missing required fields", 400);
  }

  const destId = parseInt(destinationId);

  const destination = await prisma.destination.findUnique({
    where: { id: destId },
    include: { trip: true },
  });

  if (!destination) throw new AppError("Destination not found", 404);

  if (destination.trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const parsedDate = new Date(activityDate);
  if (isNaN(parsedDate)) {
    throw new AppError("Invalid activityDate", 400);
  }

  return prisma.activity.create({
    data: {
      name,
      description,
      activityDate: parsedDate,
      activityTime,
      estimatedCost: parseFloat(estimatedCost),
      destinationId: destId,
    },
  });
};

// GET ALL
export const getActivities = async (userId) => {
  return prisma.activity.findMany({
    where: {
      destination: {
        trip: { userId },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// GET ONE
export const getActivityById = async (id, userId) => {
  const activity = await prisma.activity.findUnique({
    where: { id: parseInt(id) },
    include: {
      destination: {
        include: { trip: true },
      },
    },
  });

  if (!activity) throw new AppError("Activity not found", 404);

  if (activity.destination.trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return activity;
};

// UPDATE
export const updateActivity = async (id, data, userId) => {
  const activity = await prisma.activity.findUnique({
    where: { id: parseInt(id) },
    include: {
      destination: {
        include: { trip: true },
      },
    },
  });

  if (!activity) throw new AppError("Activity not found", 404);

  if (activity.destination.trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const updateData = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;

  if (data.activityDate !== undefined) {
    const parsedDate = new Date(data.activityDate);
    if (isNaN(parsedDate)) {
      throw new AppError("Invalid activityDate", 400);
    }
    updateData.activityDate = parsedDate;
  }

  if (data.activityTime !== undefined) updateData.activityTime = data.activityTime;

  if (data.estimatedCost !== undefined) {
    updateData.estimatedCost = parseFloat(data.estimatedCost);
  }

  if (Object.keys(updateData).length === 0) {
    throw new AppError("No valid fields to update", 400);
  }

  return prisma.activity.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

// DELETE
export const deleteActivity = async (id, userId) => {
  const activity = await prisma.activity.findUnique({
    where: { id: parseInt(id) },
    include: {
      destination: {
        include: { trip: true },
      },
    },
  });

  if (!activity) throw new AppError("Activity not found", 404);

  if (activity.destination.trip.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  await prisma.activity.delete({
    where: { id: parseInt(id) },
  });

  // ❌ no return
};