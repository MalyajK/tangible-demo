// Required external modules
require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path'); //auth0 related
const expressSession = require('express-session'); //auth0 related
const passport = require('passport'); //auth0 related
const Auth0Strategy = require('passport-auth0'); //auth0 related
const cors = require('cors');

// Required local modules
const authRouter = require("./auth")

// App variables
const port = process.env.PORT || 8080;

// Session configuration //auth0 related
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized:false
}

// Passport configuration // auth0 related
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accesToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
    }
)

// App configuration //auth0 related
app.use(expressSession(session)); 
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session())
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use("/", authRouter);

// middleware
app.use(cors());
app.use(express.json());

// database calls
const routes = require('./routes');
app.use('/api', routes);

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}....`);
})

app.use(express.static(path.join(__dirname, "../tangible/build")))

// Deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../tangible/build")))
}
