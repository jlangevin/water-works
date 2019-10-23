import express from "express";
import compression from "compression"; // compresses requests
// import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import passport from "passport";
// import bluebird from "bluebird";
import { graphQLHTTP, mongoSession } from "./graphql";

// Controllers (route handlers)

// API keys and Passport configuration

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.use(
  "/api/*",
  function (req, res) {
    res.json({ foo: 1 });
  }
);

app.use(
  '/graphql',
  graphQLHTTP
);

export default app;

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');