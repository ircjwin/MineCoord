const { Job, Mark, Resource } = require('./models.js');

module.exports = {
	jobCache: null,
	markCache: null,
	resourceCache: null,
	async loadJobCache() {
		this.jobCache = await Job.findAll({ attributes: ['id', 'name'] });
	},
	async loadMarkCache() {
		this.markCache = await Mark.findAll({ attributes: ['id', 'name'] });
	},
	async loadResourceCache() {
		this.resourceCache = await Resource.findAll({ attributes: ['id', 'name'] });
	},
	async loadAllCaches() {
		await this.loadJobCache();
		await this.loadMarkCache();
		await this.loadResourceCache();
	},
};