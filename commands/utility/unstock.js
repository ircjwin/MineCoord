const { SlashCommandBuilder } = require('discord.js');
const { Resources } = require('../../entities.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unstock')
		.setDescription('Removes resource from database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the resource.')
				.setRequired(true)),
	async execute(interaction) {
		const resourceName = interaction.options.getString('desc');
		const rowCount = await Resources.destroy({ where: { name: resourceName } });

		if (!rowCount) return interaction.reply('That resource did not exist.');
		Cache.loadResourceCache();
		return interaction.reply('Resource deleted.');
	},
};
