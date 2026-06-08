const {DataTypes} = require("sequelize")
const sequelize = require("../utils/db-connection")

const ResetPass = sequelize.define("ResetPassLinkActive",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true  
    },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
    token:{
        type:DataTypes.UUID,
        allowNull:false,
        unique:true
    },

  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
   expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },


},
)
module.exports = ResetPass;