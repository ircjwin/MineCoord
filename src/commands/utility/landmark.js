const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('landmark')
		.setDescription('In-game point of interest.')

		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Create new landmark.')
				.addStringOption(option =>
					option
						.setName('name')
						.setDescription('Name of the landmark.')
						.setRequired(true))
				.addNumberOption(option =>
					option
						.setName('x')
						.setDescription('X-coordinate of the landmark.')
						.setRequired(true))
				.addNumberOption(option =>
					option
						.setName('z')
						.setDescription('Z-coordinate of the landmark.')
						.setRequired(true))
				.addNumberOption(option =>
					option
						.setName('y')
						.setDescription('Y-coordinate of the landmark.')))

		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Delete existing landmark.')
				.addStringOption(option =>
					option
						.setName('name')
						.setDescription('Name of the landmark.')
						.setRequired(true)))

		.addSubcommand(subcommand =>
			subcommand
				.setName('edit')
				.setDescription('Change name or coordinates of existing landmark.')
				.addStringOption(option =>
					option
						.setName('name')
						.setDescription('Name of the landmark.')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('new-name')
						.setDescription('New name of the landmark.'))
				.addNumberOption(option =>
					option
						.setName('new-x')
						.setDescription('New x-coordinate of the landmark.'))
				.addNumberOption(option =>
					option
						.setName('new-y')
						.setDescription('New y-coordinate of the landmark.'))
				.addNumberOption(option =>
					option
						.setName('new-z')
						.setDescription('New z-coordinate of the landmark.')))

		.addSubcommand(subcommand =>
			subcommand
				.setName('show')
				.setDescription('Lists all landmarks.')),
	async execute(interaction) {
		console.log(interaction);
	},
};
