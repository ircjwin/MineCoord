const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Job, Resource } = require('../../../../models.js');
const Cache = require('../../../../cache.js');

module.exports = {
	JobResourceFill: {
		data: new SlashCommandSubcommandBuilder()
			.setName('fill')
			.setDescription('Fills a job resource.')
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
				option.setName('filled-quantity')
					.setDescription('Filled quantity for the job resource.')
					.setRequired(true)),
		async execute(interaction) {
			const jobId = parseInt(interaction.options.getString('job'));
			const resourceId = parseInt(interaction.options.getString('resource'));
			let filledQuantity = interaction.options.getNumber('filled-quantity');

			const job = await Job.findOne({ where: { id: jobId } });
			const resource = await Resource.findOne({ where: { id: resourceId } });
			const jobResource = await job.getJobResources({ where: { resourceId: resourceId } });
			const totalQuantity = jobResource[0].totalQuantity;
			filledQuantity += jobResource[0].filledQuantity;

			try {
				await job.removeResource(resource);
				await job.addResource(resource, { through: { filledQuantity: filledQuantity, totalQuantity: totalQuantity } });
			}
			catch (error) {
				return interaction.reply('Something went wrong with filling the job resource.');
			}

			return interaction.reply('You filled the job resource.');
		},
	},
};
