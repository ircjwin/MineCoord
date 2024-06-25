const { SlashCommandBuilder } = require('discord.js');
const { Job } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removejob')
		.setDescription('Removes job from database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('Name of the job.')
				.setRequired(true)
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = Cache.jobCache;

		const filtered = choices.filter(choice => choice.name.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		const jobId = parseInt(interaction.options.getString('name'));
		const rowCount = await Job.destroy({ where: { id: jobId } });

		if (!rowCount) return interaction.reply('That job did not exist.');
		await Cache.loadJobCache();
		return interaction.reply('Job removed.');
	},
};
