const Discord = require('discord.js')
module.exports = {
	name: 'purge',
	description: 'Removes latest messages from the mentioned member',
  category: 'Moderation',
	execute(message, args, client) {
    
    const members = message.mentions.members;
    const member = members.first();
    const executor = message.member;
    const me = message.guild.me;
    const channel = message.channel;
    let msg;
    const log = message.guild.channels.find(c => c.name.match('logs'));
    
    
    if(members.size >= 2) return message.channel.send(`I'm only able to purge one member at a time.`)
    if(members.size === 0) return message.channel.send(`Please mention a member to purge.`)
    if(member.highestRole.position >= executor.highestRole.position) return message.channel.send(`I can't purge someone with a higher role than yourself.`)
    if(member.highestRole.position >= me.highestRole.position) return message.channel.send(`I can't purge someone with a higher role than myself.`)
    if(!executor.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You don't have the \`MANAGE_MESSAGES\` permission.`)
    if(!me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`I don't have the \`MANAGE_MESSAGES\` permission.`)
    
    
    msg = channel.fetchMessages({limit: 100}).then(messages =>  message.channel.bulkDelete(messages.filter(m => m.member.user.id === member.user.id)));
    
    
    let embed = new Discord.RichEmbed()
    .setTitle(`${member.displayName} was purged`)
    .addField(`Executor`, executor.displayName)
    .addField(`Amount`, msg.size)
    
    
    log.send(embed)
    
	},
};