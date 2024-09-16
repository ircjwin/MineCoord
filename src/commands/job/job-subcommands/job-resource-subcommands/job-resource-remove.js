const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Job, Resource } = require('../../../../models.js');
const Cache = require('../../../../cache.js');

module.exports = {
	JobResourceRemove: {
		data: new SlashCommandSubcommandBuilder()
			.setName('remove')
			.setDescription('Removes resource from a job.')
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
		async execute(interaction) {
			const jobId = parseInt(interaction.options.getString('job'));
			const resourceId = parseInt(interaction.options.getString('resource'));
			const job = await Job.findOne({ where: { id: jobId } });
			const resource = await Resource.findOne({ where: { id: resourceId } });
			await job.removeResource(resource);
			return interaction.reply('Job resource removed.');
		},
	},
};
