const mongoose = require('mongoose');
const todoSchema = mongoose.model('todo');
const utils = require('../common/utils');

module.exports.getAll = async (req, res, next) => {
    utils.sendHttpResponse(res, 200, await todoSchema.find());
};

module.exports.create = async (req, res, next) => {
    try {
      utils.sendHttpResponse(res, 201, await todoSchema.create(req.body));
    } catch(err) {
      utils.sendHttpResponse(res, 500, {status: "error", error: err.toString() });
    }
};

module.exports.getById = async (req, res, next) => {
    const todoId = req.params.id;
    try {
        utils.sendHttpResponse(res, 200, await todoSchema.findById(todoId));
      } catch(err) {
        utils.sendHttpResponse(res, 500, {status: "error", error: err.toString() });
      }
};

module.exports.update = async (req, res, next) => {
    const todoId = req.params.id;
    const body = req.body;
    try {
        await todoSchema.findByIdAndUpdate(todoId, body);
        utils.sendHttpResponse(res, 201, await todoSchema.findById(todoId));
    } catch(err) {
        utils.sendHttpResponse(res, 500, {status: "error", error: err.toString() });
    }
};

module.exports.delete = async (req, res, next) => {
    const todoId = req.params.id;
    try {
        await todoSchema.findByIdAndDelete(todoId);
        utils.sendHttpResponse(res, 204, null);
      } catch(err) {
        utils.sendHttpResponse(res, 500, {status: "error", error: err.toString() });
      }
};