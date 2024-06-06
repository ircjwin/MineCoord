const { SlashCommandBuilder } = require('discord.js');
const { Resource } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removeresource')
		.setDescription('Removes resource from database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the resource.')
				.setRequired(true)),
	async execute(interaction) {
		const resourceName = interaction.options.getString('desc');
		const rowCount = await Resource.destroy({ where: { name: resourceName } });

		if (!rowCount) return interaction.reply('That resource did not exist.');
		await Cache.loadResourceCache();
		return interaction.reply('Resource deleted.');
	},
};
