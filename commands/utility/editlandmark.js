const { SlashCommandBuilder } = require('discord.js');
const { Landmark } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editlandmark')
		.setDescription('Edits landmark in database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('Name of the landmark.')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option
				.setName('new-name')
				.setDescription('New name of the landmark.'))
		.addNumberOption(option =>
			option
				.setName('new-x')
				.setDescription('New x-coordinate of the landmark.'))
		.addNumberOption(option =>
			option
				.setName('new-y')
				.setDescription('New y-coordinate of the landmark.'))
		.addNumberOption(option =>
			option
				.setName('new-z')
				.setDescription('New z-coordinate of the landmark.')),
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
		const landmarkUpdates = {
			name: interaction.options.getString('new-name'),
			x: interaction.options.getNumber('new-x'),
			y: interaction.options.getNumber('new-y'),
			z: interaction.options.getNumber('new-z'),
		};

		for (const update in landmarkUpdates) {
			if (landmarkUpdates[update] === null) {
				delete landmarkUpdates[update];
			}
		}

		const affectedRows = await Landmark.update(landmarkUpdates, { where: { id: landmarkId } });

		if (affectedRows > 0) {
			await Cache.loadLandmarkCache();
			return interaction.reply(`Landmark ${landmarkId} was edited.`);
		}

		return interaction.reply(`Could not find a landmark with name ${landmarkId}.`);
	},
};
