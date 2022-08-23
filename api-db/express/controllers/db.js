import sequelize from "../../sequelize/index.js";

export async function init(req,res) {
  sequelize.sync()
  res.status(200).send("Database initialized")
}