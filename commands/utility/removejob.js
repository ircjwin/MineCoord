const { SlashCommandBuilder } = require('discord.js');
const { Job } = require('../../models.js');
const Cache = require('../../cache.js');

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
		const rowCount = await Job.destroy({ where: { desc: jobDesc } });

		if (!rowCount) return interaction.reply('That job did not exist.');
		await Cache.loadJobCache();
		return interaction.reply('Job deleted.');
	},
};
