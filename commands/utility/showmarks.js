const { SlashCommandBuilder } = require('discord.js');
const { Mark } = require('../../models.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showmarks')
		.setDescription('Lists all landmarks.'),
	async execute(interaction) {
		const markList = await Mark.findAll({ attributes: ['name', 'x', 'y', 'z'] });
		const markString = markList.map(m => {
			const stringBuffer = [`    ${m.name}:  x: ${m.x}, `];
			stringBuffer.push(m.y ? `y: ${m.y}, ` : '');
			stringBuffer.push(`z: ${m.z}`);
			return stringBuffer.join('');
		}).join('\n') || 'No marks set.';

		return interaction.reply(`Landmarks:\n${markString}`);
	},
};
