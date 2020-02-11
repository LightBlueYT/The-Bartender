const config = require('../config.json')
const Discord = require('discord.js')

module.exports = {
	name: 'dev',
	description: 'Shows dev version',
  category: 'Information',
	execute(message, guildConf, args, client) {
  
    let embed = new Discord.RichEmbed()
    .setTitle(config.Stage + ', ' + config.DevVersion)
    
    message.channel.send(embed)
    
	},
};