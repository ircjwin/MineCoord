const { Job: Jobs, Mark: Marks, Resource: Resources } = require('./entities.js');

module.exports = {
	jobCache: null,
	markCache: null,
	resourceCache: null,
	async loadJobCache() {
		this.jobCache = await Jobs.findAll({ attributes: ['id', 'name'] });
	},
	async loadMarkCache() {
		this.markCache = await Marks.findAll({ attributes: ['id', 'name'] });
	},
	async loadResourceCache() {
		this.resourceCache = await Resources.findAll({ attributes: ['id', 'name'] });
	},
	async loadCaches() {
		await this.loadJobCache();
		await this.loadMarkCache();
		await this.loadResourceCache();
	},
};