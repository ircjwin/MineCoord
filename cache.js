const { Job, Landmark, Resource } = require('./models.js');

module.exports = {
	jobCache: [],
	landmarkCache: [],
	resourceCache: [],
	async loadJobCache() {
		this.jobCache = await Job.findAll({ attributes: ['id', 'name'] });
	},
	async loadLandmarkCache() {
		this.landmarkCache = await Landmark.findAll({ attributes: ['id', 'name'] });
	},
	async loadResourceCache() {
		this.resourceCache = await Resource.findAll({ attributes: ['id', 'name'] });
	},
	async loadAllCaches() {
		await this.loadJobCache();
		await this.loadLandmarkCache();
		await this.loadResourceCache();
	},
};