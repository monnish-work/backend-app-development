import * as destinationService from "../services/destinationService.js";

// CREATE
export const createDestination = async (req, res, next) => {
  try {
    const result = await destinationService.createDestination(
      req.body,
      req.user.userId
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getDestinations = async (req, res, next) => {
  try {
    const data = await destinationService.getDestinations(req.user.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getDestinationById = async (req, res, next) => {
  try {
    const data = await destinationService.getDestinationById(
      req.params.id,
      req.user.userId
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateDestination = async (req, res, next) => {
  try {
    const updated = await destinationService.updateDestination(
      req.params.id,
      req.body,
      req.user.userId
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteDestination = async (req, res, next) => {
  try {
    await destinationService.deleteDestination(
      req.params.id,
      req.user.userId
    );
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};