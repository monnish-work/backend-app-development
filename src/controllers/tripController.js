import * as tripService from "../services/tripService.js";

// CREATE
export const createTrip = async (req, res, next) => {
  try {
    const trip = await tripService.createTrip(
      req.body,
      req.user.userId
    );
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getTrips = async (req, res, next) => {
  try {
    const trips = await tripService.getTrips(req.user.userId);
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getTripById = async (req, res, next) => {
  try {
    const trip = await tripService.getTripById(
      req.params.id,
      req.user.userId
    );
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateTrip = async (req, res, next) => {
  try {
    const trip = await tripService.updateTrip(
      req.params.id,
      req.body,
      req.user.userId
    );
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteTrip = async (req, res, next) => {
  try {
    await tripService.deleteTrip(
      req.params.id,
      req.user.userId
    );
    res.json({ message: "Trip deleted" });
  } catch (err) {
    next(err);
  }
};