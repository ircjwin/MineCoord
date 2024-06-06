const { SlashCommandBuilder } = require('discord.js');
const { Resource } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addresource')
		.setDescription('Adds resource to database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('Name of the resource.')
				.setRequired(true)),
	async execute(interaction) {
		const resourceName = interaction.options.getString('name');

		try {
			const resource = await Resource.create({
				name: resourceName,
			});
			await Cache.loadResourceCache();

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
