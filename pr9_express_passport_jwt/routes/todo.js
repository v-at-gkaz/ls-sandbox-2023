const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

// FIXME
const secret = 'MySuperSecret1';

const auth = jwt({
  secret: secret,
  algorithms: ["HS256"]
});

/* GET todo listing */
router.get('/', auth, (req, res, next) => {
  res.send('GET todo listing');
});

/* GET todo by id */
router.get('/:id', (req, res, next) => {
  const todoId = req.params.id;
  res.send(`GET todo by id=${todoId}`);
});

/* POST -- Create new todo */
router.post('/', (req, res, next) => {
  res.send('POST -- Create new todo');
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