const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

module.exports = {
	Mark: sequelize.define('mark', {
		underscored: true,
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
	Job: sequelize.define('job', {
		underscored: true,
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
	Resource: sequelize.define('resource', {
		underscored: true,
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
	JobResource: sequelize.define('jobResource', {
		underscored: true,
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		filledQuantity: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		totalQuantity: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}),
	async init() {
		this.Job.belongsToMany(this.Resource, { through: this.JobResource });
		this.Resource.belongsToMany(this.Job, { through: this.JobResource });

		this.Job.hasMany(this.JobResource);
		this.JobResource.belongsTo(this.Job);

		this.Resource.hasMany(this.JobResource);
		this.JobResource.belongsTo(this.Resource);

		await this.Job.sync();
		await this.Resource.sync();
		await this.Mark.sync();
		await this.JobResource.sync();
	},
};
