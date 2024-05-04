const { SlashCommandBuilder } = require('discord.js');
const { Jobs } = require('../../entities.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addjob')
		.setDescription('Adds job to database.')
		.addStringOption(option =>
			option
				.setName('desc')
				.setDescription('The description of the job.')
				.setRequired(true)),
	async execute(interaction) {
		const jobPoster = interaction.user.username;
		const jobDesc = interaction.options.getString('desc');

		try {
			const job = await Jobs.create({
				poster: jobPoster,
				desc: jobDesc,
			});

			return interaction.reply(`Job ${job.desc} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That job already exists.');
			}

			return interaction.reply('Something went wrong with adding your job.');
		}
	},
};
