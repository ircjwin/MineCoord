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
		},
		z: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	}),
	Jobs: sequelize.define('jobs', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		poster: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		desc: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
	}),
	Resources: sequelize.define('resources', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
	}),
	JobResources: sequelize.define('job_resources', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		resource_qty: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}),
};
