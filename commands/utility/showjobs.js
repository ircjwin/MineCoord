const { SlashCommandBuilder } = require('discord.js');
const { Jobs } = require('../../entities.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showjobs')
		.setDescription('Lists all jobs.'),
	async execute(interaction) {
		const jobList = await Jobs.findAll({ attributes: ['desc'] });
		const jobString = jobList.map(j => j.poster + ', ' + j.desc).join('\n') || 'No jobs set.';
		return interaction.reply(`Your saved jobs:\n${jobString}`);
	},
};
