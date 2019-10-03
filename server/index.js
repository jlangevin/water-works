const express = require("express");
const fs = require("fs");
const compression = require("compression");
const server = express();

// turn off x-powered-by http header
server.settings["x-powered-by"] = false;

// enable gzip compression for appropriate file types
server.use(compression());

// Defaults requred so server can run locally from command line.
const port = process.env.PROXY_PORT || 8080;

server.use(
  '/api/*',
  function (req, res) {
    res.json({ foo: 1 })
  }
);

server.use(errorHandler);

// Custom Express error handler
function errorHandler(err, req, res, next) {
  /*
   * If you call next() with an error after you have started writing the response (for example, if you encounter
   * an error while streaming the response to the client) the Express default error handler closes the connection
   * and fails the request. Using a custom error handler, you must delegate to the default Express error handler
   * when the headers have already been sent to the client
   */
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send(fs.readFileSync("error.html", "utf8"));
}

server.listen(port, () => {
  console.log(`server listening on port ${port}!`);
});
