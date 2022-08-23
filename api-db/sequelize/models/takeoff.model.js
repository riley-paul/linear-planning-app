import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("takeoff", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    data: { type: DataTypes.JSONB, allowNull: false },
  });
};
