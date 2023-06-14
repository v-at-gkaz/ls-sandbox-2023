const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const todoCtrl = require('../controllers/todo');
const secret = process.env.JWT_SECRET;;

const auth = jwt({
  secret: secret,
  algorithms: ["HS256"]
});

router.get('/', auth, todoCtrl.getAll);
router.get('/:id', auth, todoCtrl.getById);
router.post('/', auth, todoCtrl.create);
router.patch('/:id', auth, todoCtrl.update);
router.delete('/:id', auth, todoCtrl.delete);

module.exports = router;