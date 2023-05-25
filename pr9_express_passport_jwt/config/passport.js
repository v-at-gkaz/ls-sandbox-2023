const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

// usernameField fix
passport.use(new LocalStrategy({usernameField: "login"} ,(username, password, done)=>{
    try {
        const foundUser = fakeUsers.find(candidate=>{
            return candidate.name === username && candidate.password === String(password);
        });

        if(!foundUser){
            return done(null, false, {
                message: "Incorrect username"
            });
        }

        delete foundUser.password;

        return done(null, foundUser);

    } catch(err) {
        return done(err);
    }
}));