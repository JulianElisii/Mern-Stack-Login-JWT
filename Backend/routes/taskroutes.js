const express = require("express");
const { getTasks, getTaskById, postTask, updateTask, deleteTask } = require("../controllers/controllerTask.js");
const { veryfyToken } = require("../Middlewares/verifyToken.js");
const router = express.Router();




// GET all Tasks
router.get('/', veryfyToken, getTasks);

// GET all Tasks
router.get('/:id', veryfyToken, getTaskById);

// ADD a new task
router.post('/', veryfyToken, postTask);

// UPDATE a new task
router.put('/:id', veryfyToken, updateTask);

//DELETE task
router.delete('/:id', veryfyToken, deleteTask);


module.exports = router;