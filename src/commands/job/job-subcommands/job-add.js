const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Job } = require('../../../models.js');
const Cache = require('../../../cache.js');

module.exports = {
	JobAdd: {
		data: new SlashCommandSubcommandBuilder()
			.setName('add')
			.setDescription('Adds job to database.')
			.addStringOption(option =>
				option
					.setName('name')
					.setDescription('Name of the job.')
					.setRequired(true))
			.addStringOption(option =>
				option
					.setName('description')
					.setDescription('Description of the job.')),
		async execute(interaction) {
			const jobPoster = interaction.user.username;
			const jobName = interaction.options.getString('name');
			const jobDesc = interaction.options.getString('description');

			try {
				const job = await Job.create({
					poster: jobPoster,
					name: jobName,
					description: jobDesc,
				});
				await Cache.loadJobCache();

				return interaction.reply(`Job ${job.name} added.`);
			}
			catch (error) {
				if (error.name === 'SequelizeUniqueConstraintError') {
					return interaction.reply('That job already exists.');
				}

				return interaction.reply('Something went wrong with adding your job.');
			}
		},
	},
};
