const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    descr: {type: String},
    status: {type: String, default: 'new'},
    createdAt: {
        type: Date,
        default: Date.now
      },
    closedAt: {
        type: Date,
        default: null
    }
});

mongoose.model('todo', todoSchema);