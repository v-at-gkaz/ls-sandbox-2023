const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
//const { expressjwt: jwt } = require('express-jwt');

// FIXME
const secret = 'MySuperSecret1';

/*const auth = jwt({
  secret: secret,
  algorithms: ["HS256"]
});*/

const generateJWT = (user) => {
    return jsonwebtoken.sign({
        id: user.id,
        name: user.name
    }, secret);
}

// FIXME
const fakeUsers = [
    {
        id: 1,
        name: "ivan",
        password: "123456"
    },
    {
        id: 2,
        name: "maria",
        password: "123321"
    }
];

/* POST -- Create new todo */
router.post('/login', (req, res, next) => {

  const login = req.body.login;
  const password = req.body.password;

   try {
    const foundUser = fakeUsers.filter(candidate=>{
        return candidate.name === login && candidate.password === String(password);
    })[0];

    if(!foundUser){
        res.status(401);
        res.send({
            error: "unauthorized"
        });
        return;
    }

    const token = generateJWT(foundUser);
        res.status(200);
        res.send({
            token: token
        });
     
    } catch(err) {
        res.status(401);
        res.send({
            error: err
        });
    }
});

module.exports = router;