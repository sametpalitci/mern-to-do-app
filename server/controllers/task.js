const mongoose = require('mongoose');
const Task = require('../models/Task');

const add = (req, res) => {
    const { notearea } = req.body;
    const potantialTask = new Task({
        taskText: notearea
    });
    potantialTask.save().then((data) => {
        res.json({ 'status': 'Adding task!', data })
    }).catch((err) => console.log(err))
}

const get = (req, res) => {
    Task.find({}).then(data => res.json(data))
        .catch(err => console.log(err))
}

const del = (req, res) => {
    const { deleteId } = req.body;
    Task.findByIdAndDelete(deleteId).then(() => {
        res.json({ 'status': 'DeleteTask!' })
    })
}
const upd = (req, res) => {
    const { updateId, notearea } = req.body;
    const updateText = {
        taskText:notearea
    }
    Task.findByIdAndUpdate(updateId, updateText).then(() => {
        res.json({ 'status': 'DeleteTask!' })
    })
}
module.exports = { add, get, del, upd }