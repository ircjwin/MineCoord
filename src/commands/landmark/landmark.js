const { SlashCommandBuilder } = require('discord.js');
const { Cache } = require('../../cache.js');
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
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = Cache.landmarkCache;
		const filtered = choices.filter(choice => choice.name.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice.name, value: choice.id.toString() })),
		);
	},
	async execute(interaction) {
		console.log(interaction);
	},
};
