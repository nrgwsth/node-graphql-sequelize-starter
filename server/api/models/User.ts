import * as Sequelize from "sequelize"


/**
createdAt and updatedAt attributes inserted by sequelize by default
**/

export default function(sequelize: Sequelize.Sequelize){

	const UserClassMethods = {
		getUserById(id: number){
			return User.findById(id)
		}
	}

	const User = sequelize.define("user", {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		id:{
			primaryKey: true,
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		profileImage: {
			type: Sequelize.STRING
		},
		provider: {
			type: Sequelize.STRING(1234),
			allowNull: false
		},
		thirdPartyId: {
			type: Sequelize.STRING
		},
		email:{
			type: Sequelize.STRING
		}
	}, {
		classMethods: UserClassMethods,
		paranoid: true
	})

	return User
}