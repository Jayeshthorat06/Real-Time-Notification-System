import { DataTypes } from "sequelize";
import { sequelize } from "../database/db";
import User from "./User";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'       
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    priority: {
      type: DataTypes.ENUM("LOW", "HIGH", "MEDIUM"),
      defaultValue: "LOW",
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM("PENDING", "PROCESSING", "SENT", "FAILED"),
      defaultValue: "PENDING",
      allowNull: false
    },
  },
  {
    tableName: "notifications",
    timestamps: true,
  }
);
Notification.belongsTo(User, {
  foreignKey: "user_id",
});
export default Notification;