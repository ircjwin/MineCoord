const { SlashCommandBuilder } = require('discord.js');
const { Jobs } = require('../../entities.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removejob')
		.setDescription('Removes job from database.')
		.addStringOption(option =>
			option
				.setName('desc')
				.setDescription('The description of the job.')
				.setRequired(true)),
	async execute(interaction) {
		const jobDesc = interaction.options.getString('desc');
		const rowCount = await Jobs.destroy({ where: { desc: jobDesc } });

		if (!rowCount) return interaction.reply('That job did not exist.');

		return interaction.reply('Job deleted.');
	},
};
