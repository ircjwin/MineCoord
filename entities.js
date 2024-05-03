const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

module.exports = {
	Marks: sequelize.define('marks', {
		name: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		x: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		y: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		z: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	}),
};
