const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Job } = require('../../../models.js');
const Cache = require('../../../cache.js');

module.exports = {
	JobEdit: {
		data: new SlashCommandSubcommandBuilder()
			.setName('edit')
			.setDescription('Edits job in database.')
			.addStringOption(option =>
				option
					.setName('name')
					.setDescription('Name of the job.')
					.setRequired(true)
					.setAutocomplete(true))
			.addStringOption(option =>
				option
					.setName('new-name')
					.setDescription('New name of the job.'))
			.addStringOption(option =>
				option
					.setName('new-description')
					.setDescription('New description of the job.')),
		async execute(interaction) {
			const jobName = interaction.options.getString('name');
			const jobUpdates = {
				name: interaction.options.getString('new-name'),
				description: interaction.options.getString('new-description'),
			};

			for (const update in jobUpdates) {
				if (jobUpdates[update] === null) {
					delete jobUpdates[update];
				}
			}

			const affectedRows = await Job.update(jobUpdates, { where: { name: jobName } });

			if (affectedRows > 0) {
				await Cache.loadJobCache();
				return interaction.reply(`Job ${jobName} was edited.`);
			}

			return interaction.reply(`Could not find a job with name ${jobName}.`);
		},
	},
};
