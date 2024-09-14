const { SlashCommandSubcommandGroupBuilder } = require('discord.js');
const { JobResourceAdd } = require('./job-resource-subcommands/job-resource-add.js');
const { JobResourceRemove } = require('./job-resource-subcommands/job-resource-remove.js');
const { JobResourceEdit } = require('./job-resource-subcommands/job-resource-edit.js');
const { JobResourceShow } = require('./job-resource-subcommands/job-resource-show.js');
const { JobResourceFill } = require('./job-resource-subcommands/job-resource-fill.js');


module.exports = {
	JobResourceSubgroup: {
		data: new SlashCommandSubcommandGroupBuilder()
			.setName('resource')
			.setDescription('Required material for in-game project.')
			.addSubcommand(JobResourceAdd.data)
			.addSubcommand(JobResourceRemove.data)
			.addSubcommand(JobResourceEdit.data)
			.addSubcommand(JobResourceShow.data)
			.addSubcommand(JobResourceFill.data),
	},
};
