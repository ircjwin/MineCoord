const { SlashCommandBuilder } = require('discord.js');
const { Mark } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addmark')
		.setDescription('Adds landmark to database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the landmark.')
				.setRequired(true))
		.addNumberOption(option =>
			option
				.setName('x')
				.setDescription('The x-coordinate of the landmark.')
				.setRequired(true))
		.addNumberOption(option =>
			option
				.setName('z')
				.setDescription('The z-coordinate of the landmark.')
				.setRequired(true))
		.addNumberOption(option =>
			option
				.setName('y')
				.setDescription('The y-coordinate of the landmark.')),
	async execute(interaction) {
		const markName = interaction.options.getString('name');
		const markX = interaction.options.getNumber('x');
		const markY = interaction.options.getNumber('y');
		const markZ = interaction.options.getNumber('z');

		try {
			const mark = await Mark.create({
				name: markName,
				x: markX,
				y: markY,
				z: markZ,
			});
			await Cache.loadMarkCache();
			return interaction.reply(`Mark ${mark.name} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That mark already exists.');
			}

			return interaction.reply('Something went wrong with adding your mark.');
		}
	},
};
