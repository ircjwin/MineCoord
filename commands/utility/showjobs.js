const { SlashCommandBuilder } = require('discord.js');
const { Job } = require('../../models.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showjobs')
		.setDescription('Lists all jobs.'),
	async execute(interaction) {
		const jobList = await Job.findAll({ attributes: ['poster', 'name'] });
		const jobString = jobList.map(j => {
			const stringBuffer = [`    poster: ${j.poster}, name: ${j.name}`];
			stringBuffer.push(j.description ? `, description: ${j.description}` : '');
			return stringBuffer.join('');
		}).join('\n') || 'No jobs set.';
		return interaction.reply(`Jobs:\n${jobString}`);
	},
};
