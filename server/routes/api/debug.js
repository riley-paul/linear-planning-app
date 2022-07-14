const router = require("express").Router();
const resetDb = require("../../db/reset");

module.exports = (db) => {
  router.get("/resetdb", (req, res) => {
    resetDb(db)
      .then(() => {
        console.log("Database reset");
        res.status(200).send("Database reset");
      })
      .catch((err) => {
        console.log("Database not reset");
        console.error(err.stack);
        res.status(500).send("Database not reset");
      });
  });

  return router;
};
