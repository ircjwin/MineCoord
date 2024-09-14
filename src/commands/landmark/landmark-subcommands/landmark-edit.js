const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Landmark } = require('../../../models.js');
const Cache = require('../../../cache.js');

module.exports = {
	LandmarkEdit: {
		data: new SlashCommandSubcommandBuilder()
			.setName('edit')
			.setDescription('Edits landmark in database.')
			.addStringOption(option =>
				option
					.setName('name')
					.setDescription('Name of the landmark.')
					.setRequired(true))
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
		async execute(interaction) {
			const landmarkName = interaction.options.getString('name');
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

			const affectedRows = await Landmark.update(landmarkUpdates, { where: { name: landmarkName } });

			if (affectedRows > 0) {
				await Cache.loadLandmarkCache();
				return interaction.reply(`Landmark ${landmarkName} was edited.`);
			}

			return interaction.reply(`Could not find a landmark with name ${landmarkName}.`);
		},
	},
};
