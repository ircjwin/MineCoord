const { SlashCommandBuilder } = require('discord.js');
const { LandmarkAdd } = require('./landmark-subcommands/landmark-add.js');
const { LandmarkRemove } = require('./landmark-subcommands/landmark-remove.js');
const { LandmarkEdit } = require('./landmark-subcommands/landmark-edit.js');
const { LandmarkShow } = require('./landmark-subcommands/landmarks-show.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('landmark')
		.setDescription('In-game point of interest.')
		.addSubcommand(LandmarkAdd.data)
		.addSubcommand(LandmarkRemove.data)
		.addSubcommand(LandmarkEdit.data)
		.addSubcommand(LandmarkShow.data),
	async execute(interaction) {
		console.log(interaction);
	},
};
