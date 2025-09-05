const Sequelize = require("sequelize")
const sequelize = require("../config/db")
//import models and sequelize the argument
const User = require("./user.model")(sequelize)

