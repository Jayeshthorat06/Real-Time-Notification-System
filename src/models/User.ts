import { DataTypes } from "sequelize";
import { sequelize } from "../database/db";
import Notification from "./Notification";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);
User.hasMany(Notification, {
  foreignKey: "user_id",
});
export default User;