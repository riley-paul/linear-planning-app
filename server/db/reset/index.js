const read = require("./../../utils/read");
const path = require("path");

module.exports = function (db) {
  return new Promise((resolve, reject) => {
    read(path.resolve(__dirname, "schema.sql"))
      .then((schema) => db.query(schema))
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
