const { SlashCommandBuilder } = require('discord.js');
const { Resources } = require('../../entities.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addresource')
		.setDescription('Adds resource to database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the resource.')
				.setRequired(true)),
	async execute(interaction) {
		const resourceName = interaction.options.getString('name');

		try {
			const resource = await Resources.create({
				name: resourceName,
			});

			return interaction.reply(`Resource ${resource.name} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That resource already exists.');
			}

			return interaction.reply('Something went wrong with adding your resource.');
		}
	},
};
