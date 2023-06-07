const express = require('express'); 
const passport = require('passport');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const secret = process.env.JWT_SECRET;
const saltRounds = 10; // FIXME: move to environment

const generateJWT = (user) => {
    return jsonwebtoken.sign({
        id: user.id,
        name: user.name
    }, secret);
}

/* POST -- Get JWT */
router.post('/login', (req, res, next) => {

    passport.authenticate('local', {}, (err, user, info) => {

        if(err) {
          res.status(401);
          res.send({
            error: err
          });
          return;
        }

        if(user){
          const token = generateJWT(user);
          res.status(200);
          res.send({
              token: token
          });
          return;
        }

        res.status(406);
        res.send(info);

    })(req, res);

});

router.post('/signup', async (req, res, next) => {
  const userSchema = mongoose.model('user');
    try {

        const login = req.body.login;

        // check example
        if(login === 'vasya') {
          throw new Error("login is dinied");
        }

        const email = req.body.email;
        const password = bcrypt.hashSync(req.body.password, saltRounds);

        const newUser = await userSchema.create({
            username: login,
            email,
            password
        });

        delete newUser.password;

        res.status(201);
        res.send({status: "success", createdUser: newUser });


    } catch (err){
        res.status(500);
        res.send({status: "error", error: err.toString() });
    }
});

module.exports = router;