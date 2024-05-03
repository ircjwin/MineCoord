const { Events } = require('discord.js');
const { Marks } = require('../entities.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		Marks.sync();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
