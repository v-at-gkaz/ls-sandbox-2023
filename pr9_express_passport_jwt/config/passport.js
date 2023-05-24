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

passport.use(new LocalStrategy((username, password, done)=>{
    try {
        const foundUser = fakeUsers.filter(candidate=>{
            return candidate.name === username && candidate.password === String(password);
        })[0];

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