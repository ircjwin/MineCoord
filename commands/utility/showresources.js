const { SlashCommandBuilder } = require('discord.js');
const { Resources } = require('../../entities.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showresources')
		.setDescription('Lists all resources.'),
	async execute(interaction) {
		const resourceList = await Resources.findAll({ attributes: ['name'] });
		const resourceString = resourceList.map(r => r.name).join('\n') || 'No resources set.';
		return interaction.reply(`Your saved resources:\n${resourceString}`);
	},
};
