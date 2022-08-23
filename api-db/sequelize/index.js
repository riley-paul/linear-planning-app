import { Sequelize } from "sequelize";
import applyExtraSetup from "./extraSetup.js";

import userModel from "./models/user.model.js";
import projectModel from "./models/project.model.js";
import centerlineModel from "./models/centerline.model.js";
import takeoffModel from "./models/takeoff.model.js";

const sequelize = new Sequelize("linear_planning", "riley", null, {
  dialect: "postgres",
  url: process.env.PSQL_URL,
});

const modelDefiners = [userModel, projectModel, centerlineModel, takeoffModel];
modelDefiners.forEach((f) => f(sequelize));
applyExtraSetup(sequelize);

export const { models } = sequelize;
export default sequelize;
