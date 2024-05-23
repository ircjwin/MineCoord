const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

module.exports = {
	Mark: sequelize.define('Mark', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
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
	Job: sequelize.define('Job', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		poster: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unqiue: true,
		},
		desc: {
			type: Sequelize.STRING,
		},
	}),
	Resource: sequelize.define('Resource', {
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
	JobResource: sequelize.define('JobResource', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		resourceQty: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}),
};

module.exports.Job.belongsToMany(module.exports.Resource, { through: module.exports.JobResource });
module.exports.Resource.belongsToMany(module.exports.Job, { through: module.exports.JobResource });
