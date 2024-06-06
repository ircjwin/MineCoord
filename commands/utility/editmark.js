const { SlashCommandBuilder } = require('discord.js');
const { Mark } = require('../../models.js');
const Cache = require('../../cache.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('editmark')
		.setDescription('Edits landmark in database.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the landmark.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('new-name')
				.setDescription('The new name of the landmark.'))
		.addNumberOption(option =>
			option
				.setName('x')
				.setDescription('The new x-coordinate of the landmark.'))
		.addNumberOption(option =>
			option
				.setName('y')
				.setDescription('The new y-coordinate of the landmark.'))
		.addNumberOption(option =>
			option
				.setName('z')
				.setDescription('The new z-coordinate of the landmark.')),
	async execute(interaction) {
		const markName = interaction.options.getString('name');
		const markUpdates = {
			name: interaction.options.getString('new-name'),
			x: interaction.options.getNumber('x'),
			y: interaction.options.getNumber('y'),
			z: interaction.options.getNumber('z'),
		};

		for (const update in markUpdates) {
			if (markUpdates[update] === null) {
				delete markUpdates[update];
			}
		}

		const affectedRows = await Mark.update(markUpdates, { where: { name: markName } });

		if (affectedRows > 0) {
			await Cache.loadMarkCache();
			return interaction.reply(`Mark ${markName} was edited.`);
		}

		return interaction.reply(`Could not find a mark with name ${markName}.`);
	},
};
