const Discord = require('discord.js')
module.exports = {
	name: 'ban',
	description: 'Bans a member from your guild',
  category: 'Moderation',
	execute(message, args, client) {
    
    const members = message.mentions.members;
    const member = members.first();
    const executor = message.member;
    const me = message.guild.me;
    const guild = message.guild.name;
    const reason = args[1];
    const log = message.guild.channels.find(c => c.name.match('log'));
    
    
    if(members.size >= 2) return message.channel.send(`I'm only able to ban **one** member at a time.`)
    if(members.size === 0) return message.channel.send(`Please mention a member to ban.`)
    if(member.id === executor.id) return message.channel.send(`You can't ban yourself.`)
    if(!member.bannable) return message.channel.send(`This member can't be banned.`)
    if(member.highestRole.position >= executor.highestRole.position) return message.channel.send(`I can't ban someone who has a higher role than you.`)
    if(member.highestRole.position >= me.highestRole.position) return message.channel.send(`I can't ban someone who has a higher role than myself.`)
    if(!executor.hasPermission('BAN_MEMBERS')) return message.channel.send(`You need the \`BAN_MEMBERS\` permission to ban someone.`)
    if(!me.hasPermission('BAN_MEMBERS')) return message.channel.send(`I need the \`BAN_MEMBERS\` permission to ban someone.`)
    
    
    let user = new Discord.RichEmbed()
    .setTitle(guild)
    .addField(`Executor`, executor.user.username)
    .addField(`Type`, `Ban`)
    .addField(`Reason`, reason)
    .setColor(`RANDOM`)
    
    let server = new Discord.RichEmbed()
    .setTitle(`${member.displayName} was banned`)
    .addField(`Reason`, reason)
    .addField(`Executor`, executor.displayName)
    .setColor(`RANDOM`)
    
    
    member.user.send(user)
    log.send(server)
    .then(() => member.ban())
	},
};