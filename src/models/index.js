const Sequelize = require("sequelize")
const sequelize = require("../config/db")
//import models and sequelize the argument
const User = require("./user.model")(sequelize)
const Contact = require("./contact.model")(sequelize)
const Chat = require("./chat.model")(sequelize)
const Message = require("./message.model")(sequelize)
const GroupMember = require("./groupmember.model")(sequelize)
const BlockedUser = require("./blockuser.model")(sequelize)
const Notification = require("./notification.model")(sequelize)
const ChatUserSettings = require("./userchatsetting.model")(sequelize)


User.hasMany(Contact, { foreignKey: "userId" })
Contact.belongsTo(User, { foreignKey: "userId" })


Chat.hasMany(Message, { foreignKey: "chatId" })
Message.belongsTo(Chat, { foreignKey: "chatId" })

User.hasMany(Message, { foreignKey: "senderId" })
Message.belongsTo(User, { foreignKey: "senderId" })


Chat.hasMany(GroupMember, { foreignKey: "chatId" })
GroupMember.belongsTo(Chat, { foreignKey: "chatId" })


User.hasMany(GroupMember, { foreignKey: "userId" })
GroupMember.belongsTo(User, { foreignKey: "userId" })


User.belongsToMany(Chat, { through: GroupMember, foreignKey: "userId", otherKey: "chatId" })
Chat.belongsToMany(User, { through: GroupMember, foreignKey: "chatId", otherKey: "userId" })


User.hasMany(BlockedUser, { foreignKey: "userId" })
BlockedUser.belongsTo(User, { foreignKey: "userId" })


User.hasMany(Notification, { foreignKey: "userId" })
Notification.belongsTo(User, { foreignKey: "userId" })


User.hasMany(ChatUserSettings, { foreignKey: "userId" })
ChatUserSettings.belongsTo(User, { foreignKey: "userId" })


module.exports = {
    sequelize,
    User,
    Contact,
    Chat,
    Message,
    GroupMember,
    BlockedUser,
    Notification,
    ChatUserSettings
}