const Discord = require('discord.js')
module.exports = async (client, channel) => {
 let chan = channel.guild.channels.find(c => c.name.match('bot-logs'))
 
 let embed = new Discord.RichEmbed()
 .setTitle(`Channel created <#${channel.id}>`)
 .addField('type', channel.type)
 chan.send(embed)
}