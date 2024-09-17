const { SlashCommandSubcommandBuilder } = require('discord.js');
const { Landmark } = require('../../../models.js');

module.exports = {
	LandmarkShow: {
		data: new SlashCommandSubcommandBuilder()
			.setName('show')
			.setDescription('Lists all landmarks.'),
		async execute(interaction) {
			const landmarkList = await Landmark.findAll({ attributes: ['name', 'x', 'y', 'z'] });
			const landmarkString = landmarkList.map(m => {
				const stringBuffer = [`    name: ${m.name}, x: ${m.x}, `];
				stringBuffer.push(m.y ? `y: ${m.y}, ` : '');
				stringBuffer.push(`z: ${m.z}`);
				return stringBuffer.join('');
			}).join('\n') || '    No landmarks set.';

			return interaction.reply(`Landmarks:\n${landmarkString}`);
		},
	},
};
