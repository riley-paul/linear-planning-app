import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("project", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
  });
};
