
const express    = require('express');
require('dotenv').config({path:'./variables.env'});
const app = express();
app.use(express.static(__dirname + '/public'));

const cors = require('cors');
const whitelist = ['http://localhost:3030','http://localhost:3000', 'https://air-condition.herokuapp.com/api','https://air-condition.herokuapp.com']

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const session = require('express-session');
app.use(session({
  secret: process.env.JWTSECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 24 *60 *60 * 1000},
  httpOnly: true
}));
//
// const graphqlHTTP = require('express-graphql')
// const schema = require('./dbconf/schema.js')
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true
// }))

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./dbconf/swagger3.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const Router = require('./routes/index');
app.use(Router);

//Handling an errors
const {CustomError, notFoundError, dbValidationError} = require('./errors/errorHandler');
app.use(notFoundError);
app.use(dbValidationError);
app.use(CustomError);

module.exports = app;
