const Sequelize = require("sequelize")
const sequelize = require("../config/db")
//import models and sequelize the argument
const User = require("./user.model")(sequelize)
const Otp = require("./otp.model")(sequelize)
const Contact = require("./contact.model")(sequelize)
const Chat = require("./chat.model")(sequelize)
const Message = require("./message.model")(sequelize)
const Chatmember = require("./chatmember.model")(sequelize)
const Media = require("./media.model")(sequelize)
const BlockedUser = require("./blockuser.model")(sequelize)


User.hasMany(Contact, { foreignKey: "ownerUserId", as: "contacts", onDelete: "CASCADE" })
Contact.belongsTo(User, { foreignKey: "ownerUserId", as: "owner" })


User.hasMany(BlockedUser, { foreignKey: "ownerUserId", as: "blocked", onDelete: "CASCADE" })
BlockedUser.belongsTo(User, { foreignKey: "ownerUserId", as: "owner" })

BlockedUser.belongsTo(User, { foreignKey: "blockedUserId", as: "blockedAccount" })

Chat.hasMany(Chatmember, { foreignKey: "chatId", as: "members", onDelete: "CASCADE" })
Chatmember.belongsTo(Chat, { foreignKey: "chatId", as: "chat" })


User.hasMany(Chatmember, { foreignKey: "userId", as: "chatMemberships", onDelete: "CASCADE" })
Chatmember.belongsTo(User, { foreignKey: "userId", as: "user" })


Chat.hasMany(Message, { foreignKey: "chatId", as: "messages", onDelete: "CASCADE" })
Message.belongsTo(Chat, { foreignKey: "chatId", as: "chat" })


User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages", onDelete: "SET NULL" });
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });


Message.hasMany(Media, { foreignKey: "messageId", as: "media", onDelete: "CASCADE" });
Media.belongsTo(Message, { foreignKey: "messageId", as: "message" });


User.hasMany(Media, { foreignKey: "userId", as: "uploads", onDelete: "SET NULL" });
Media.belongsTo(User, { foreignKey: "userId", as: "uploader" });




module.exports = {
    sequelize,
    User,
    Otp,
    Contact,
    Chat,
    Message,
    Chatmember,
    BlockedUser,
}