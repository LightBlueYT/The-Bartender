const Discord = require('discord.js')
module.exports = {
	name: 'kick',
	description: 'Kick an member',
  category: 'Moderation',
	execute(message, args, client) {
    
    const members = message.mentions.members;
    const member = members.first();
    const executor = message.member;
    const me = message.guild.me;
    const guild = message.guild.name;
    const reason = args[1];
    const log = message.guild.channels.find(c => c.name.match('log'));
    
    
    if(members.size >= 2) return message.channel.send(`I'm only able to kick **one** member at a time.`)
    if(members.size === 0) return message.channel.send(`Please mention a member to kick.`)
    if(member.id === executor.id) return message.channel.send(`You can't kick yourself.`)
    if(!member.kickable) return message.channel.send(`This member can't be kicked.`)
    if(!executor.hasPermission('KICK_MEMBERS')) return message.channel.send(`You are missing the \`KICK_MEMBERS\` permission.`)
    if(!me.hasPermission('KICK_MEMBERS')) return message.channel.send(`I'm missing the \`KICK_MEMBRS\` permission.`)
    if(member.highestRole.position >= executor.highestRole.position) return message.channel.send(`I can only kick members who have a lower role than yourself.`)
    if(member.highestRole.position >= me.highestRole.position) return message.channel.send(`I can only kick members who have a lower role than myself.`)
    
    
    let user = new Discord.RichEmbed()
    .setTitle(guild)
    .addField(`Executor`, executor.user.username)
    .addField(`Type`, `Kick`)
    .addField(`Reason`, reason)
    .setColor(`RANDOM`)
    
    let server = new Discord.RichEmbed()
    .setTitle(`${member.displayName} was kicked`)
    .addField(`Reason`, reason)
    .addField(`Executor`, executor.displayName)
    .setColor(`RANDOM`)
    
    member.user.send(user)
    log.send(server)
    .then(() => member.kick())
	},
};