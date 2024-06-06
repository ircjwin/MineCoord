const { SlashCommandBuilder } = require('discord.js');
const { Resource } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editresource')
		.setDescription('Edits resource in database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the resource.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('new-name')
				.setDescription('The new name of the resource.')),
	async execute(interaction) {
		const resourceName = interaction.options.getString('name');
		const newResourceName = interaction.options.getString('new-name');

		const affectedRows = await Resource.update({ name: newResourceName }, { where: { name: resourceName } });

		if (affectedRows > 0) {
			await Cache.loadResourceCache();
			return interaction.reply(`Resource ${resourceName} was edited.`);
		}

		return interaction.reply(`Could not find a resource with name ${resourceName}.`);
	},
};
