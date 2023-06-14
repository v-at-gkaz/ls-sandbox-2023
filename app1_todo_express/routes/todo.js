const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');


const todoCtrl = require('../controllers/todo');

const secret = process.env.JWT_SECRET;;

const auth = jwt({
  secret: secret,
  algorithms: ["HS256"]
});

/* GET todo listing */
router.get('/', auth, todoCtrl.getAll);

/* GET todo by id */
router.get('/:id', auth, todoCtrl.getById);

/* POST -- Create new todo */
router.post('/', auth, todoCtrl.create);

/* PATCH -- Update todo by id */
router.patch('/:id', auth, todoCtrl.update);

/* DELETE -- Delete todo by id */
router.delete('/:id', auth, todoCtrl.delete);

module.exports = router;