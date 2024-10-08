const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Job } = require('../../../models.js');
const Cache = require('../../../cache.js');

module.exports = {
	JobRemove: {
		data: new SlashCommandSubcommandBuilder()
			.setName('remove')
			.setDescription('Removes job from database.')
			.addStringOption(option =>
				option
					.setName('name')
					.setDescription('Name of the job.')
					.setRequired(true)
					.setAutocomplete(true)),
		async execute(interaction) {
			const jobName = interaction.options.getString('name');
			const rowCount = await Job.destroy({ where: { name: jobName } });

			if (!rowCount) return interaction.reply('That job did not exist.');
			await Cache.loadJobCache();
			return interaction.reply('Job removed.');
		},
	},
};
