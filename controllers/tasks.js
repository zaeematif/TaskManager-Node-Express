const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../errors/custom-error')

//GET ALL TASK
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

//CREATE A TASK
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task }); // to check if express.json() middleware is working or not
});

//GET SINGLE TASK
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with the id: ${taskID}`, 404));
  }

  res.status(200).json(task);
});

//DELETE A SINGLE TASK
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findByIdAndDelete({ _id: taskID });

  if (!task) {    
    let deleteError = createCustomError(`No task with the id: ${taskID}`, 404)
    return next(deleteError);
  }

  res.status(200).json({ task });
});

//UPDATE A SINGLE TASK
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const taskData = req.body;

  const task = await Task.findOneAndUpdate({ _id: taskID }, taskData, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with the id: ${taskID}`, 404));
  }

  res.status(201).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
