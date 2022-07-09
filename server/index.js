const express = require("express");
const app = express();
const cors = require('cors')

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(cors())
app.use(express.static("data"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
