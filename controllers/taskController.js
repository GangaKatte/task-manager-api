const { v4: uuidv4 } = require('uuid');

let tasks = require("../models/task");

const validateTask = require("../utils/validator");

function getAllTasks(req, res) {
    let result = [...tasks];

    if (req.query.status) {
         result = result.filter(task => task.status === req.query.status);
    }

    if (req.query.sortBy) {
        const  [key, order] = req.query.sortBy.split(':');
        result.sort((a, b) => {
            if (order === 'desc') return b[key].localeCompare(a[key]);
            return a[key].localeCompare(b[key]);
        });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || result.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = result.slice(start, end);

    res.json(paginated);
}

function getTaskById(req, res) {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
}

function createTask(req, res) {
    const task = req.body;
    if (!validateTask(task)) {
        return res.status(400).json({ message: 'Title and Description are required' });
    }
    const newTask = { id: uuidv4(), ...task, status: task.status || 'pending' };
    tasks.push(newTask);
    res.status(201).json(newTask);
}

function updateTask(req, res) {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    Object.assign(task, req.body);
    res.json(task);
}

function deleteTask(req, res) {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
