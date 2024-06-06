const { SlashCommandBuilder } = require('discord.js');
const { Job } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('post')
		.setDescription('Adds job to database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the job.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('desc')
				.setDescription('The description of the job.')),
	async execute(interaction) {
		const jobPoster = interaction.user.username;
		const jobName = interaction.options.getString('name');
		const jobDesc = interaction.options.getString('desc');

		try {
			const job = await Job.create({
				poster: jobPoster,
				name: jobName,
				desc: jobDesc,
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
};
