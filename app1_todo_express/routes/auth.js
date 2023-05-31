const express = require('express'); 
const passport = require('passport');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

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

        res.status(200);
        res.send(info);

    })(req, res);

});

module.exports = router;