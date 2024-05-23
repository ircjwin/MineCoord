const { SlashCommandBuilder } = require('discord.js');
const { Marks } = require('../../entities.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmark')
		.setDescription('Removes landmark from database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the landmark.')
				.setRequired(true)),
	async execute(interaction) {
		const markName = interaction.options.getString('name');
		const rowCount = await Marks.destroy({ where: { name: markName } });

		if (!rowCount) return interaction.reply('That mark did not exist.');
		Cache.loadMarkCache();
		return interaction.reply('Mark deleted.');
	},
};
