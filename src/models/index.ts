import User from "./User";
import Notification from "./Notification";

/**
 * Associations
 */

User.hasMany(Notification, {
  foreignKey: "user_id",
});

Notification.belongsTo(User, {
  foreignKey: "user_id",
});

export {
  User,
  Notification,
};