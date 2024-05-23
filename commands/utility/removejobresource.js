const { SlashCommandBuilder } = require('discord.js');
const { Job: Jobs, Resource: Resources } = require('../../entities.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removejobresource')
		.setDescription('Removes resource from given job.')
		.addStringOption(option =>
			option.setName('job')
				.setDescription('Job to search for.')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('resource')
				.setDescription('Resource to search for.')
				.setRequired(true)
				.setAutocomplete(true)),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;

		if (focusedOption.name === 'job') {
			choices = Cache.jobCache;
		}

		if (focusedOption.name === 'resource') {
			choices = Cache.resourceCache;
		}

		const filtered = choices.filter(choice => choice.name.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		const jobId = parseInt(interaction.options.getString('job'));
		const resourceId = parseInt(interaction.options.getString('resource'));
		const job = await Jobs.findOne({ where: { id: jobId } });
		const resource = await Resources.findOne({ where: { id: resourceId } });
		await job.removeResource(resource);
		return await interaction.reply('The job resource was removed.');
	},
};
