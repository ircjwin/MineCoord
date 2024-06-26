const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tonether')
		.setDescription('Converts Overworld coordinates to Nether coordinates.')
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
		const overworldX = interaction.options.getNumber('x');
		const overworldZ = interaction.options.getNumber('z');
		const netherX = Math.floor(overworldX / 8);
		const netherZ = Math.floor(overworldZ / 8);

		return interaction.reply(`The Nether coordinates are  \`x: ${netherX}, z: ${netherZ}\``);
	},
};
