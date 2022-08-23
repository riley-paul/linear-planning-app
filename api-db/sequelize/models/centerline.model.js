import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("centerline", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.STRING,
    line: { type: DataTypes.JSONB, allowNull: false },
    markers: { type: DataTypes.JSONB, allowNull: false },
    footprint: { type: DataTypes.JSONB, allowNull: false },
    elevation: { type: DataTypes.JSONB, allowNull: false },
  });
};
