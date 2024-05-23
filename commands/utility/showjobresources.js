const { SlashCommandBuilder } = require('discord.js');
const { Job: Jobs } = require('../../entities.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showjobresource')
		.setDescription('Shows all resources for a job.')
		.addStringOption(option =>
			option.setName('job')
				.setDescription('Job to search for.')
				.setRequired(true)
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused();
		const choices = Cache.jobCache;

		const filtered = choices.filter(choice => choice.name.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		const jobId = parseInt(interaction.options.getString('job'));
		const job = await Jobs.findOne({ where: { id: jobId } });
		const materials = job.getResources();
		return await interaction.reply(materials);
	},
};
