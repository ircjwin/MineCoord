const { SlashCommandBuilder } = require('discord.js');
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
	async execute(interaction) {
		console.log(interaction);
	},
};
