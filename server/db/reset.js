const fs = require("fs");
const path = require("path");

const db = require("../db");

fs.readFile(`./db/schema/create.sql`, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  db.query(data)
    .then(() => {
      console.log("database reset");
      // db.end();
    })
    .catch((err) => {
      console.log(err);
      // db.end();
    });
});

// Promise.all([read(path.resolve(__dirname, `/schema/create.sql`))])
//   .then(([create]) => {
//     db.query(create).then(() => {
//       console.log("Database Reset");
//       db.end();
//     });
//   })
//   .catch((error) => {
//     console.log(`Error setting up the reset route: ${error}`);
//     db.end();
//   });
