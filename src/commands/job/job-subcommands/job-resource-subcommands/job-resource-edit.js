const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Job, Resource } = require('../../../../models.js');
// const Cache = require('../../../../cache.js');

module.exports = {
	JobResourceEdit: {
		data: new SlashCommandSubcommandBuilder()
			.setName('edit')
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
		async execute(interaction) {
			const jobId = parseInt(interaction.options.getString('job'));
			const resourceId = parseInt(interaction.options.getString('resource'));
			const newTotalQuantity = interaction.options.getNumber('new-total-quantity');
			const job = await Job.findOne({ where: { id: jobId } });
			const resource = await Resource.findOne({ where: { id: resourceId } });
			const jobResource = await job.getJobResources({ where: { resourceId: resourceId } });
			const filledQuantity = jobResource[0].filledQuantity;

			try {
				await job.removeResource(resource);
				await job.addResource(resource, { through: { filledQuantity: filledQuantity, totalQuantity: newTotalQuantity } });
			}
			catch (error) {
				return interaction.reply('Something went wrong with editing the job resource.');
			}

			return interaction.reply('You edited the job resource.');
		},
	},
};
