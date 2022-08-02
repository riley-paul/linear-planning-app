const fs = require("fs");

module.exports = function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: "utf-8" }, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
