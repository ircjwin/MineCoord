const { SlashCommandBuilder } = require('discord.js');
const { Cache } = require('../../cache.js');
const { JobAdd } = require('./job-subcommands/job-add.js');
const { JobRemove } = require('./job-subcommands/job-remove.js');
const { JobEdit } = require('./job-subcommands/job-edit.js');
const { JobShow } = require('./job-subcommands/job-show.js');
const { JobResourceSubgroup } = require('./job-subcommands/job-resource-subgroup.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('job')
		.setDescription('In-game project.')
		.addSubcommand(JobAdd.data)
		.addSubcommand(JobRemove.data)
		.addSubcommand(JobEdit.data)
		.addSubcommand(JobShow.data)
		.addSubcommandGroup(JobResourceSubgroup.data),
	async autocomplete(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;

		if (focusedOption.name === 'job' || focusedOption.name === 'name') {
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
		console.log(interaction);
	},
};
