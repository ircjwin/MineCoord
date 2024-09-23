const { SlashCommandBuilder } = require('discord.js');
const Cache = require('../../cache.js');
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

		const filtered = choices.filter(function(choice) {
			if (this.count < 25 && choice.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())) {
				this.count++;
				return true;
			}
			return false;
		}, { count: 0 });

		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		if (interaction.options.getSubcommandGroup()) {
			JobResourceSubgroup.execute(interaction);
		}
		else {
			switch (interaction.options.getSubcommand()) {
			case 'add':
				JobAdd.execute(interaction);
				break;
			case 'remove':
				JobRemove.execute(interaction);
				break;
			case 'edit':
				JobEdit.execute(interaction);
				break;
			case 'show':
				JobShow.execute(interaction);
				break;
			default:
				interaction.reply(`${interaction.options.getSubcommand()} is not a valid subcommand for Job.`);
			}
		}
	},
};
