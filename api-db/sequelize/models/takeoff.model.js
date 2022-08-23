import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("takeoff", {
    name: { type: DataTypes.CHAR, allowNull: false },
    description: DataTypes.TEXT,
    data: { type: DataTypes.JSONB, allowNull: false },
  });
};
