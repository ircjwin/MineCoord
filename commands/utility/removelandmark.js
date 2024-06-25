const { SlashCommandBuilder } = require('discord.js');
const { Landmark } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removelandmark')
		.setDescription('Removes landmark from database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('Name of the landmark.')
				.setRequired(true)
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = Cache.landmarkCache;

		const filtered = choices.filter(choice => choice.name.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		const landmarkId = parseInt(interaction.options.getString('name'));
		const rowCount = await Landmark.destroy({ where: { id: landmarkId } });

		if (!rowCount) return interaction.reply('That landmark did not exist.');
		await Cache.loadLandmarkCache();
		return interaction.reply('Landmark removed.');
	},
};
