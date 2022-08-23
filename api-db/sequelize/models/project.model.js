import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("project", {
    name: { type: DataTypes.CHAR, allowNull: false },
    description: DataTypes.TEXT,
  });
};
