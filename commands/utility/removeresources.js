const { SlashCommandBuilder } = require('discord.js');
const { Resources } = require('../../entities.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removeresource')
		.setDescription('Removes resource from database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the resource.')
				.setRequired(true)),
	async execute(interaction) {
		const resourceName = interaction.options.getString('desc');
		const rowCount = await Resources.destroy({ where: { name: resourceName } });

		if (!rowCount) return interaction.reply('That resource did not exist.');

		return interaction.reply('Resource deleted.');
	},
};
