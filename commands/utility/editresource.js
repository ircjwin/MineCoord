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
				.setDescription('Name of the resource.')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option
				.setName('new-name')
				.setDescription('New name of the resource.')),
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
		const newResourceName = interaction.options.getString('new-name');

		const affectedRows = await Resource.update({ name: newResourceName }, { where: { id: resourceId } });

		if (affectedRows > 0) {
			await Cache.loadResourceCache();
			return interaction.reply(`Resource ${resourceId} was edited.`);
		}

		return interaction.reply(`Could not find a resource with name ${resourceId}.`);
	},
};
