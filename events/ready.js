const { Events } = require('discord.js');
const { Marks, Jobs, JobResources, Resources } = require('../entities.js');
const Cache = require('../cache.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		Marks.sync();
		Jobs.sync();
		Resources.sync();
		JobResources.sync();
		Cache.loadCaches();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
