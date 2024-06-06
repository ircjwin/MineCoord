const { SlashCommandBuilder } = require('discord.js');
const { Resource } = require('../../models.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showresources')
		.setDescription('Lists all resources.'),
	async execute(interaction) {
		const resourceList = await Resource.findAll({ attributes: ['name'] });
		const resourceString = resourceList.map(r => {
			`    name: ${r.name}`;
		}).join('\n') || 'No resources set.';
		return interaction.reply(`Resources:\n${resourceString}`);
	},
};
