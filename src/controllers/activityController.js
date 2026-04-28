import * as activityService from "../services/activityService.js";

// CREATE
export const createActivity = async (req, res, next) => {
  try {
    const activity = await activityService.createActivity(
      req.body,
      req.user.userId
    );

    res.status(201).json(activity);
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getActivities = async (req, res, next) => {
  try {
    const activities = await activityService.getActivities(
      req.user.userId
    );

    res.json(activities);
  } catch (err) {
    next(err);
  }
};

// GET ONE
export const getActivityById = async (req, res, next) => {
  try {
    const activity = await activityService.getActivityById(
      parseInt(req.params.id),
      req.user.userId
    );

    res.json(activity);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateActivity = async (req, res, next) => {
  try {
    const updated = await activityService.updateActivity(
      parseInt(req.params.id),
      req.body,
      req.user.userId
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteActivity = async (req, res, next) => {
  try {
    await activityService.deleteActivity(
      parseInt(req.params.id),
      req.user.userId
    );

    // 204 = No Content (no body allowed)
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};