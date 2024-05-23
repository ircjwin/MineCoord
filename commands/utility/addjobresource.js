const { SlashCommandBuilder } = require('discord.js');
const { Jobs, Resources } = require('../../entities.js');
const { jobCache, resourceCache } = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addjobresource')
		.setDescription('Adds a resource to a job.')
		.addStringOption(option =>
			option.setName('job')
				.setDescription('Job to search for.')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('resource')
				.setDescription('Resource to search for.')
				.setRequired(true)
				.setAutocomplete(true))
		.addNumberOption(option =>
			option.setName('qty')
				.setDescription('The resource quantity for the job.')
				.setRequired(true)),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;

		if (focusedOption.name === 'job') {
			choices = jobCache;
		}

		if (focusedOption.name === 'resource') {
			choices = resourceCache;
		}

		const filtered = choices.filter(choice => choice.name.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		const jobId = parseInt(interaction.options.getString('job'));
		const resourceId = parseInt(interaction.options.getString('resource'));
		const resourceQty = interaction.options.getNumber('qty');
		const job = await Jobs.findOne({ where: { id: jobId } });
		const resource = await Resources.findOne({ where: { id: resourceId } });
		await job.addResources(resource, { through: { resource_qty: resourceQty } });
		return await interaction.reply('You added a resource to a job.');
	},
};
