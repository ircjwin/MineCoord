const { SlashCommandBuilder } = require('discord.js');
const { Job } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editjob')
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
		const jobUpdates = {
			name: interaction.options.getString('new-name'),
			description: interaction.options.getString('new-description'),
		};

		for (const update in jobUpdates) {
			if (jobUpdates[update] === null) {
				delete jobUpdates[update];
			}
		}

		const affectedRows = await Job.update(jobUpdates, { where: { id: jobId } });

		if (affectedRows > 0) {
			await Cache.loadJobCache();
			return interaction.reply(`Job ${jobId} was edited.`);
		}

		return interaction.reply(`Could not find a job with name ${jobId}.`);
	},
};
