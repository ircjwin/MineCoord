const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Landmark } = require('../../../models.js');
const Cache = require('../../../cache.js');

module.exports = {
	LandmarkRemove: {
		data: new SlashCommandSubcommandBuilder()
			.setName('remove')
			.setDescription('Removes landmark from database.')
			.addStringOption(option =>
				option
					.setName('name')
					.setDescription('Name of the landmark.')
					.setRequired(true)
					.setAutocomplete(true)),
		async execute(interaction) {
			const landmarkName = interaction.options.getString('name');
			const rowCount = await Landmark.destroy({ where: { name: landmarkName } });

			if (!rowCount) return interaction.reply('That landmark did not exist.');
			await Cache.loadLandmarkCache();
			return interaction.reply('Landmark removed.');
		},
	},
};
