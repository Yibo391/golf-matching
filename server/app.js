import {createRequire} from 'module'
const require = createRequire(import.meta.url);
import express from 'express'
const cookieParser = require("cookie-parser");
import session from 'express-session'
import route from './src/route/router.mjs'
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

app.use(session({
    secret: 'loremipsumdolorsitamet',
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false,            //setting this false for http connections
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000)
    }
}))

app.use(cookieParser())

var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', route)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

