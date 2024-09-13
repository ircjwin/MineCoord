const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('job')
		.setDescription('In-game project.')

		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Create new job.')
				.addStringOption(option =>
					option
						.setName('name')
						.setDescription('Name of the job.')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('description')
						.setDescription('Description of the job.')))

		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Delete existing job.')
				.addStringOption(option =>
					option
						.setName('name')
						.setDescription('Name of the job.')
						.setRequired(true)))

		.addSubcommand(subcommand =>
			subcommand
				.setName('edit')
				.setDescription('Change name or description of existing job.')
				.addStringOption(option =>
					option
						.setName('name')
						.setDescription('Name of the job.')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('new-name')
						.setDescription('New name of the job.'))
				.addStringOption(option =>
					option
						.setName('new-description')
						.setDescription('New description of the job.')))

		.addSubcommand(subcommand =>
			subcommand
				.setName('show')
				.setDescription('Lists all jobs.'))

		.addSubcommandGroup(subcommandgroup =>
			subcommandgroup
				.setName('resource')
				.setDescription('Required material for in-game project.')

				.addSubcommand(subcommand =>
					subcommand
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
								.setRequired(true)))

				.addSubcommand(subcommand =>
					subcommand
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
								.setAutocomplete(true)))

				.addSubcommand(subcommand =>
					subcommand
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
								.setRequired(true)))

				.addSubcommand(subcommand =>
					subcommand
						.setName('show')
						.setDescription('List all resources for specified job.')
						.addStringOption(option =>
							option.setName('job')
								.setDescription('Job to search for.')
								.setRequired(true)
								.setAutocomplete(true)))

				.addSubcommand(subcommand =>
					subcommand
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
								.setRequired(true)))),
	async execute(interaction) {
		console.log(interaction);
	},
};
