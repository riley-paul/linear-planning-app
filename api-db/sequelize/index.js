import { Sequelize } from "sequelize";
import applyExtraSetup from "./extraSetup";

import userModel from "./models/user.model";
import projectModel from "./models/project.model";
import centerlineModel from "./models/centerline.model";
import takeoffModel from "./models/takeoff.model";

const sequelize = new Sequelize(process.env.PSQL_URL);

try {
  sequelize.authenticate();
  console.log("Database connection established");
} catch (err) {
  console.error("Unable to connect to database:", err);
}

const modelDefiners = [userModel, projectModel, centerlineModel, takeoffModel];
modelDefiners.forEach((f) => f(sequelize));
applyExtraSetup(sequelize);

export default sequelize;
