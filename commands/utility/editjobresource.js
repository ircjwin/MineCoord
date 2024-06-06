const { SlashCommandBuilder } = require('discord.js');
const { Job, Resource } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editjobresource')
		.setDescription('Edits the total quantity for a job resource.')
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
			option.setName('new-total-quantity')
				.setDescription('New total quantity for the job resource.')
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

		if (focusedOption.name === 'new-total-quantity') {
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
		const newTotalQuantity = interaction.options.getNumber('new-total-quantity');
		const job = await Job.findOne({ where: { id: jobId } });
		const resource = await Resource.findOne({ where: { id: resourceId } });

		try {
			await job.removeResource(resource);
			await job.addResource(resource, { through: { totalQuantity: newTotalQuantity } });
		}
		catch (error) {
			return interaction.reply('Something went wrong with editing the job resource.');
		}

		return interaction.reply('You edited the job resource.');
	},
};
