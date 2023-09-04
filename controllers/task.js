import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task added",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ErrorHandler("Task not exist", 404));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ErrorHandler("taskf not found", 404));
    }
    await task.deleteOne();
    res.status(201).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
