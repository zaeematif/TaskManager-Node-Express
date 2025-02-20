const Task = require("../models/Task");

//GET ALL TASK
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json({tasks});

  } catch (error) {
    res.status(500).json({msg: error.message})
  }
};

//CREATE A TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({task}); // to check if express.json() middleware is working or not
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
};

//GET SINGLE TASK
const getTask = async (req, res) => {
  try {
    const {id:taskID} = req.params;
    
    const task = await Task.findOne({_id: taskID});
    
    if(!task){
      return res.status(404).json({msg: `No Task with id: ${taskID}`});
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({msg: error})
  }
};


//DELETE A SINGLE TASK
const deleteTask = async (req, res) => {
  try {
    const {id:taskID} = req.params;
    
    const task = await Task.findByIdAndDelete({_id: taskID});
    
    if(!task){
      return res.status(404).json({msg: `No Task with id: ${taskID}`});
    }
    
    res.status(200).json({task});
  } catch (error) {
    res.status(500).json({msg: error})
  }
};

//UPDATE A SINGLE TASK
const updateTask = async (req, res) => {
  try {
    const {id:taskID} = req.params;

    const taskData = req.body;

    const task = await Task.findOneAndUpdate({_id: taskID}, taskData, {
      new:true,
      runValidators: true
    });
    
    if(!task){
      return res.status(404).json({msg: `No task with id: ${taskID}`})
    }

    res.status(201).json({task})

  } catch (error) {
    res.status(500).json({msg: error})
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
