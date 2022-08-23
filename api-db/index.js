import dotenv from "dotenv";
import expressListRoutes from "express-list-routes";
import app from "./express/app.js";
import sequelize from "./sequelize/index.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  console.log(`Starting Sequelize + Express example on port ${PORT}...`);

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
    expressListRoutes(app);
  });
}

init();
