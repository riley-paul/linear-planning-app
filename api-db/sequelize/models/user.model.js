import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("user", {
    name: { type: DataTypes.CHAR, allowNull: false },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { is: /\S+@\S+\.\S+/ },
    },
    hash: { type: DataTypes.CHAR, allowNull: false },
  });
};
