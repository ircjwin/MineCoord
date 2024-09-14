const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Job, Resource } = require('../../../../models.js');
const Cache = require('../../../../cache.js');

module.exports = {
	JobResourceShow: {
		data: new SlashCommandSubcommandBuilder()
			.setName('show')
			.setDescription('Shows all resources for a job.')
			.addStringOption(option =>
				option.setName('job')
					.setDescription('Job to search for.')
					.setRequired(true)
					.setAutocomplete(true)),
		async autocomplete(interaction) {
			const focusedValue = interaction.options.getFocused();
			const choices = Cache.jobCache;

			const filtered = choices.filter(choice => choice.name.startsWith(focusedValue));
			await interaction.respond(
				filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
			);
		},
		async execute(interaction) {
			const jobId = parseInt(interaction.options.getString('job'));
			const job = await Job.findOne({ where: { id: jobId } });
			const jobResourceList = await job.getJobResources({ include: Resource });
			const jobResourceString = jobResourceList.map(j => {
				return `    resource: ${j.resource.name}, filled: ${j.filledQuantity}, total: ${j.totalQuantity}`;
			}).join('\n') || '    No job resources set.';

			return interaction.reply(`${job.name}'s resource list:\n${jobResourceString}`);
		},
	},
};
