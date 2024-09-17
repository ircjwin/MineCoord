const { SlashCommandBuilder } = require('discord.js');
const Cache = require('../../cache.js');
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

		const filtered = choices.filter(function(choice) {
			if (this.count < 25 && choice.name.startsWith(focusedValue)) {
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
		switch (interaction.options.getSubcommand()) {
		case 'add':
			LandmarkAdd.execute(interaction);
			break;
		case 'remove':
			LandmarkRemove.execute(interaction);
			break;
		case 'edit':
			LandmarkEdit.execute(interaction);
			break;
		case 'show':
			LandmarkShow.execute(interaction);
			break;
		default:
			interaction.reply(`${interaction.options.getSubcommand()} is not a valid subcommand for Landmark.`);
		}
	},
};
