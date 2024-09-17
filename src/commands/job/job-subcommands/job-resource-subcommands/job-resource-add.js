const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Job, Resource } = require('../../../../models.js');
// const Cache = require('../../../../cache.js');

module.exports = {
	JobResourceAdd: {
		data: new SlashCommandSubcommandBuilder()
			.setName('add')
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
				option.setName('total-quantity')
					.setDescription('Total quantity for the job resource.')
					.setRequired(true)),
		async execute(interaction) {
			const jobId = parseInt(interaction.options.getString('job'));
			const resourceId = parseInt(interaction.options.getString('resource'));
			const totalQuantity = interaction.options.getNumber('total-quantity');
			const job = await Job.findOne({ where: { id: jobId } });
			const resource = await Resource.findOne({ where: { id: resourceId } });
			await job.addResource(resource, { through: { totalQuantity: totalQuantity } });
			return interaction.reply('You added a resource to a job.');
		},
	},
};
