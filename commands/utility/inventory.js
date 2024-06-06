const { SlashCommandBuilder } = require('discord.js');
const { Resource } = require('../../models.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('Lists all resources.'),
	async execute(interaction) {
		const resourceList = await Resource.findAll({ attributes: ['name'] });
		const resourceString = resourceList.map(r => r.name).join('\n') || 'No resources set.';
		return interaction.reply(`Your saved resources:\n${resourceString}`);
	},
};
