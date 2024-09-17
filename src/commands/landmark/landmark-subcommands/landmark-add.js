const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Landmark } = require('../../../models.js');
const Cache = require('../../../cache.js');

module.exports = {
	LandmarkAdd: {
		data: new SlashCommandSubcommandBuilder()
			.setName('add')
			.setDescription('Adds landmark to database.')
			.addStringOption(option =>
				option
					.setName('name')
					.setDescription('Name of the landmark.')
					.setRequired(true))
			.addNumberOption(option =>
				option
					.setName('x')
					.setDescription('X-coordinate of the landmark.')
					.setRequired(true))
			.addNumberOption(option =>
				option
					.setName('z')
					.setDescription('Z-coordinate of the landmark.')
					.setRequired(true))
			.addNumberOption(option =>
				option
					.setName('y')
					.setDescription('Y-coordinate of the landmark.')),
		async execute(interaction) {
			const landmarkName = interaction.options.getString('name');
			const landmarkX = interaction.options.getNumber('x');
			const landmarkY = interaction.options.getNumber('y');
			const landmarkZ = interaction.options.getNumber('z');

			try {
				const landmark = await Landmark.create({
					name: landmarkName,
					x: landmarkX,
					y: landmarkY,
					z: landmarkZ,
				});
				await Cache.loadLandmarkCache();
				return interaction.reply(`Landmark ${landmark.name} added.`);
			}
			catch (error) {
				if (error.name === 'SequelizeUniqueConstraintError') {
					return interaction.reply('That landmark already exists.');
				}

				return interaction.reply('Something went wrong with adding your landmark.');
			}
		},
	},
};
