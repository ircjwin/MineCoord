const { SlashCommandBuilder } = require('discord.js');
const { Marks } = require('../../entities.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Lists all landmarks.'),
	async execute(interaction) {
		const markList = await Marks.findAll({ attributes: ['name', 'x', 'y', 'z'] });
		const markString = markList.map(m => {
			const stringBuffer = [`    ${m.name}:  `];
			stringBuffer.push(`x: ${m.x}, `);
			stringBuffer.push(m.y ? `y: ${m.y}, ` : '');
			stringBuffer.push(`z: ${m.z}`);
			return stringBuffer.join('');
		}).join('\n') || 'No marks set.';

		return interaction.reply(`Your saved marks:\n${markString}`);
	},
};
