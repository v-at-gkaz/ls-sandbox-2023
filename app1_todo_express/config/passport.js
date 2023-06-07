const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const userSchema = mongoose.model('user');
const bcrypt = require('bcrypt');
const saltRounds = 10; // FIXME: move to environment

passport.use(new LocalStrategy({usernameField: "login"} , async (username, password, done)=>{
    try {

        const foundUser = await userSchema.findOne({username});

        if(!foundUser){
             return done(null, false, {
                 message: "Incorrect login"
             });
        }

        if(!bcrypt.compareSync(password, foundUser.password, saltRounds)){
            return done(null, false, {
                message: "Incorrect password"
            });
        }
        

        delete foundUser.password;

        return done(null, foundUser);

    } catch(err) {
        return done(err);
    }
}));