const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fromnether')
		.setDescription('Converts Nether coordinates to Overworld coordinates.')
		.addNumberOption(option =>
			option
				.setName('x')
				.setDescription('X-coordinate to be converted.')
				.setRequired(true))
		.addNumberOption(option =>
			option
				.setName('z')
				.setDescription('Z-coordinate to be converted.')
				.setRequired(true)),
	async execute(interaction) {
		const netherX = interaction.options.getNumber('x');
		const netherZ = interaction.options.getNumber('z');
		const overworldX = netherX * 8;
		const overworldZ = netherZ * 8;

		return interaction.reply(`The Overworld coordinates are  \`x: ${overworldX}, z: ${overworldZ}\``);
	},
};
