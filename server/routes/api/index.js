const router = require("express").Router();
const debug = require("./debug");

module.exports = (db) => {
  router.use("/debug", debug(db));

  return router;
};
