import * as Sequelize from "sequelize"

const sequelize : Sequelize.Sequelize = new Sequelize("test", "anurag", "asdf1234", {
	host: "localhost",
	dialect: "mysql"
})

import UserFactory from "./User"

export const User = UserFactory(sequelize)