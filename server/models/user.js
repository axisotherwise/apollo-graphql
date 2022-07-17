import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: false,
      underscored: false,
      modelName: "User",
      tableName: "users",
      charset: "utf8",
      collate: "utf8_general_ci",
    })
  }
}