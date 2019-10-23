import session from "express-session";
import graphqlHTTP from "express-graphql";
import mongo from "connect-mongo";
// import buildSchema from "graphql";
import mongoose from "mongoose";

import { MONGODB_URI, SESSION_SECRET } from "../util/secrets";

// Construct a schema, using GraphQL schema language
const Schema = mongoose.Schema;
// const schema = buildSchema(`
//   type Query {
//     hello: String
// `);

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
// mongoose.Promise = bluebird;

const mongooseConnection = mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

// Create express session
const MongoStore = mongo(session);

// Create mongo session
export const mongoSession = session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
});

export const graphQLHTTP = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});

module.exports = {
  graphQLHTTP,
  mongooseConnection,
  mongoSession
}