const mongoose = require('mongoose');
const todoSchema = mongoose.model('todo');

module.exports.getAll = async (req, res, next) => {
    // res.send('GET todo listing');
    res.status(200);
    res.send(await todoSchema.find());
};

module.exports.create = async (req, res, next) => {
    // res.send('POST -- Create new todo');
    try {
      const newTodo = await todoSchema.create(req.body);
      res.status(201);
      res.send(newTodo);
    } catch(err) {
      res.status(500);
      res.send({status: "error", error: err.toString() });
    }
};

module.exports.getById = async (req, res, next) => {
    const todoId = req.params.id;
    try {
        res.status(200);
        res.send(await todoSchema.findById(todoId));
      } catch(err) {
        res.status(500);
        res.send({status: "error", error: err.toString() });
      }
};

module.exports.update = async (req, res, next) => {
    const todoId = req.params.id;
    const body = req.body;
    try {
        await todoSchema.findByIdAndUpdate(todoId, body);
        res.status(201);
        res.send(await todoSchema.findById(todoId));
    } catch(err) {
        res.status(500);
        res.send({status: "error", error: err.toString() });
    }
};

module.exports.delete = async (req, res, next) => {
    const todoId = req.params.id;
    try {
        await todoSchema.findByIdAndDelete(todoId);
        res.status(204);
        res.send(null);
      } catch(err) {
        res.status(500);
        res.send({status: "error", error: err.toString() });
      }
};