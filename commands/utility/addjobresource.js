const { SlashCommandBuilder } = require('discord.js');
const { Job, Resource } = require('../../models.js');
const Cache = require('../../cache.js');

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
			option.setName('quantity')
				.setDescription('The total resource quantity for the job.')
				.setRequired(true)),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;

		if (focusedOption.name === 'job') {
			choices = Cache.jobCache;
		}

		if (focusedOption.name === 'resource') {
			choices = Cache.resourceCache;
		}

		if (focusedOption.name === 'quantity') {
			return;
		}

		const filtered = choices.filter(choice => choice.name.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		const jobId = parseInt(interaction.options.getString('job'));
		const resourceId = parseInt(interaction.options.getString('resource'));
		const resourceQty = interaction.options.getNumber('quantity');
		const job = await Job.findOne({ where: { id: jobId } });
		const resource = await Resource.findOne({ where: { id: resourceId } });
		await job.addResource(resource, { through: { totalQuantity: resourceQty } });
		return interaction.reply('You added a resource to a job.');
	},
};
