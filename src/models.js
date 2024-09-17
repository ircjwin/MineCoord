const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

module.exports = {
	Landmark: sequelize.define('landmark', {
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
		description: {
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
	async loadResources() {
		const minecraftData = require('minecraft-data');
		const mcData = minecraftData('1.20');
		// Mobs?

		const blocks = mcData.blocksArray.map(b => { return { name: b.displayName }; });
		const items = mcData.itemsArray.map(i => { return { name: i.displayName }; });
		const foods = mcData.foodsArray.map(f => { return { name: f.displayName }; });
		const enchants = mcData.enchantmentsArray.map(e => { return { name: e.displayName }; });
		const entities = mcData.entitiesArray.map(e => { return { name: e.displayName }; });
		const resourceData = blocks.concat(items, foods, enchants, entities);

		try {
			await this.Resource.bulkCreate(resourceData, { ignoreDuplicates: true });
			console.log(`Minecraft Version ${mcData.version}: Data loaded!`);
		}
		catch (error) {
			console.log(`Resource Table Error: ${error}`);
		}
	},
	async init() {
		this.Job.belongsToMany(this.Resource, { through: this.JobResource });
		this.Resource.belongsToMany(this.Job, { through: this.JobResource });

		this.Job.hasMany(this.JobResource);
		this.JobResource.belongsTo(this.Job);

		this.Resource.hasMany(this.JobResource);
		this.JobResource.belongsTo(this.Resource);

		await this.Job.sync();
		await this.Resource.sync();
		await this.Landmark.sync();
		await this.JobResource.sync();
		await this.loadResources();
	},
};
