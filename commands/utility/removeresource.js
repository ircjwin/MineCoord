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
				.setDescription('Name of the resource.')
				.setRequired(true)
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = Cache.resourceCache;

		const filtered = choices.filter(choice => choice.name.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		const resourceId = parseInt(interaction.options.getString('name'));
		const rowCount = await Resource.destroy({ where: { id: resourceId } });

		if (!rowCount) return interaction.reply('That resource did not exist.');
		await Cache.loadResourceCache();
		return interaction.reply('Resource removed.');
	},
};
