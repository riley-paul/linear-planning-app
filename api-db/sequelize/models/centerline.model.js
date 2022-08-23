import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("centerline", {
    name: { type: DataTypes.CHAR, allowNull: false },
    description: DataTypes.TEXT,
    line: { type: DataTypes.JSONB, allowNull: false },
    markers: { type: DataTypes.JSONB, allowNull: false },
    footprint: { type: DataTypes.JSONB, allowNull: false },
    elevation: { type: DataTypes.JSONB, allowNull: false },
  });
};
