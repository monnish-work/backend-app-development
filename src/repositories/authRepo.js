import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";

// FIND USER BY EMAIL
export const findByEmail = async (email) => {
  if (!email) {
    throw new AppError("Email is required", 400);
  }

  return prisma.user.findUnique({
    where: { email },
  });
};

// CREATE USER
export const createUser = async (data) => {
  if (!data || !data.email || !data.password) {
    throw new AppError("Missing required user fields", 400);
  }

  try {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  } catch (err) {
    // handle unique constraint (email)
    if (err.code === "P2002") {
      throw new AppError("User already exists", 409);
    }

    throw err;
  }
};