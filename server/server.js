const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 8001;

app.use(morgan("dev"));
app.use(express.json());

app.listen(PORT).then(console.log(`app is listening on port ${PORT}`));
