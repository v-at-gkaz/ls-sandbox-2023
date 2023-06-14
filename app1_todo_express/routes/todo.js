const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const mongoose = require('mongoose');
const todoSchema = mongoose.model('todo');

const secret = process.env.JWT_SECRET;;

const auth = jwt({
  secret: secret,
  algorithms: ["HS256"]
});

/* GET todo listing */
router.get('/', auth, async (req, res, next) => {
  // res.send('GET todo listing');
  res.status(200);
  res.send(await todoSchema.find());
});

/* GET todo by id */
router.get('/:id', (req, res, next) => {
  const todoId = req.params.id;
  res.send(`GET todo by id=${todoId}`);
});

/* POST -- Create new todo */
router.post('/', async (req, res, next) => {
  // res.send('POST -- Create new todo');
  try {
    const newTodo = await todoSchema.create(req.body);
    res.status(201);
    res.send(newTodo);
  } catch(err) {
    res.status(500);
    res.send({status: "error", error: err.toString() });
  }
});

/* PATCH -- Update todo by id */
router.patch('/:id', (req, res, next) => {
  const todoId = req.params.id;
  res.send(`PATCH -- Update todo by id=${todoId}`);
});

/* DELETE -- Delete todo by id */
router.delete('/:id', (req, res, next) => {
  const todoId = req.params.id;
  res.send(`DELETE -- Delete todo by id=${todoId}`);
});

module.exports = router;