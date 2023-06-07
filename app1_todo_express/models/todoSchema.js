const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    descr: {type: String}
});

mongoose.model('todo', todoSchema);