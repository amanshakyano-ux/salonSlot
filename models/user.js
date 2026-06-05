const {DataTypes} = require("sequelize")
const sequelize = require("../utils/db-connection")
const User = sequelize.define("user",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[6,100]
        }
    },
    role:{
        type:DataTypes.ENUM("user","owner"),
        allowNull:false,
        defaultValue:"user"
    }
})
module.exports = User
