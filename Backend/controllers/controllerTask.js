const Task = require("../models/task.js")

const getTasks = async (req, res) => {
  const userId = req.userId
  const tasks = await Task.find({ "owner": userId });
  res.json(tasks);
}

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
}
const postTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId
  const task = new Task({ title, description, "owner": userId });
  await task.save();
  res.json({ status: 'Task Saved' });
}

const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.findByIdAndUpdate(req.params.id, newTask); //le paso como parametro el id de la tarea original y newTask va a ser por el que la voy a actualizar
  res.json({ status: 'Task Updated' });
}


const deleteTask = async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: 'Task Deleted' });
}

module.exports = { getTasks, getTaskById, postTask, updateTask, deleteTask }