const Discord = require('discord.js')
module.exports = {
	name: 'clean',
	description: 'clean a channel fully',
  category: 'Moderator',
	execute(message, args, client) {
    
    const channel = message.channel;
    const parent = message.channel.parent;
    const executor = message.member;
    const me = message.guild.me;
    const log = message.guild.channels.find(c => c.name.match('logs'));
    
    
    if(!executor.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`You don't have the \`MANAGE_CHANNELS\` permission.`)
    if(!me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`I don't have the \`MANAGE_CHANNELS\` permission.`)
    
    
    let server = new Discord.RichEmbed()
    .setTitle(executor.displayName)
    .setDescription(`${executor.displayName} has cleaned the channel **\`${channel.name.toUpperCase()}\`**`)
    .setColor(`RANDOM`)
    
    
    log.send(server)
    
    
    channel.clone(channel.name, true, true).then(channel => channel.edit({parent: parent}))
    channel.delete()
	},
};