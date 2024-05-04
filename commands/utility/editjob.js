const { SlashCommandBuilder } = require('discord.js');
const { Jobs } = require('../../entities.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editjob')
		.setDescription('Edits job in database.')
		.addStringOption(option =>
			option
				.setName('desc')
				.setDescription('The description of the job.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('new-desc')
				.setDescription('The new description of the job.')),
	async execute(interaction) {
		const jobDesc = interaction.options.getString('desc');
		const newJobDesc = interaction.options.getString('new-desc');

		const affectedRows = await Jobs.update({ desc: newJobDesc }, { where: { desc: jobDesc } });

		if (affectedRows > 0) {
			return interaction.reply(`Job ${jobDesc} was edited.`);
		}

		return interaction.reply(`Could not find a job with description ${jobDesc}.`);
	},
};
