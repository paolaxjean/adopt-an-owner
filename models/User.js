const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compare(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 50]}
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [8]}
    },
    desired_pet: {
      type: DataTypes.STRING,
      validate: { isAlphanumeric: true, len: [0, 100]}
    },
    family_size: {
      type: DataTypes.INTEGER,
      validate: {len: [1, 20]}
    },
    income: {
      type: DataTypes.INTEGER,
      validate: {max: 999000000}
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true}
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {len: [1, 99]}
    },
    bio: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true, 
        len: [0, 10000]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

module.exports = User;
