const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskText: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('taskSchema', taskSchema);