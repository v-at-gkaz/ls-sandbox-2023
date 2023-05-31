import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    descr: {type: String}
});

mongoose.model('todo', todoSchema);