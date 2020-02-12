
const express    = require('express');
require('dotenv').config({path:'./variables.env'});
const app = express();
app.use(express.static(__dirname + '/public'));

const cors = require('cors');
const whitelist = ['https://air-con-front.herokuapp.com','http://localhost:3030','http://localhost:3000', 'https://air-condition.herokuapp.com/api','https://air-condition.herokuapp.com']

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

const expressGraphQL= require('express-graphql');
const {checkIfAuthenticated} = require('./helpers/authCheck');
const schema = require('./schemaQl/schema')
app.use('/graphql', expressGraphQL(
    {
        schema: schema,
        graphiql:true,
      context: (req) => {
        console.log(2222222222,req)
          return ({

        user: req.user,
      })},

    }
));
app.use('/gr', expressGraphQL(
    {
      schema: schema,
      graphiql:true,
      context: ({ req }) => ({
        user: req.user,
      }),


    }
));

                // const { ApolloServer, gql } = require('apollo-server-express');
                //
                // // Construct a schema, using GraphQL schema language
                // const typeDefs = gql`
                //   type Query {
                //     hello: String
                //   }
                // `;
                // // Provide resolver functions for your schema fields
                // const resolvers = {
                //   Query: {
                //     hello: () => 'Hello world!',
                //   },
                // };
                //
                // const server = new ApolloServer({ typeDefs, resolvers });
                // const path = '/graphql';
                //
                // server.applyMiddleware({ app, path });






                                  // const graphqlHTTP = require('express-graphql')
                                  // const gql = require('graphql-tag')
                                  // const { buildASTSchema } = require('graphql')
                                  //
                                  // const schema = buildASTSchema(gql`
                                  //   type Query {
                                  //     hello: String
                                  //   }
                                  // `)
                                  //
                                  // const rootValue = {
                                  //   hello: () => 'Hello, world'
                                  // }
                                  //
                                  // app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))
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
