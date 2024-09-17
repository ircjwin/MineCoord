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
		async execute(interaction) {
			switch (interaction.options.getSubcommand()) {
			case 'add':
				JobResourceAdd.execute(interaction);
				break;
			case 'remove':
				JobResourceRemove.execute(interaction);
				break;
			case 'edit':
				JobResourceEdit.execute(interaction);
				break;
			case 'show':
				JobResourceShow.execute(interaction);
				break;
			case 'fill':
				JobResourceFill.execute(interaction);
				break;
			default:
				interaction.reply(`${interaction.options.getSubcommand()} is not a valid subcommand for Job Resource.`);
			}
		},
	},
};
