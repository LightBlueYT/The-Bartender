const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'ping',
	description: 'Shows bot ping',
  category: 'Information',
	execute(message, guildConf, args, client) {
    
    let heart = ms(client.ping)
    let ping = new Date().getTime() - message.createdTimestamp
  
    let embed = new Discord.RichEmbed()
    .setDescription(`${heart} :heartbeat: \n${ms(ping)} ping`)
    
    message.channel.send(embed)
    
	},
};