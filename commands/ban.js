const Discord = require('discord.js')
module.exports = {
	name: 'ban',
	description: 'Ban an member',
  category: 'Moderation',
	execute(message, args, client) {
    
    //Permission checks
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You dont have the needed permission `BAN_MEMBERS`')
    if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('I dont have the needed permission `BAN_MEMBERS`')
    
    //Blocks executor to ban themself
    let mod = message.member;
    let person = message.mentions.members.first();
    if(person.id === mod.id) return message.reply('You cannot ban yourself.')
    
    //Further checking to know if the member can be banned
    let executor = message.member;
    let member = message.mentions.members.first();
    let me = message.guild.me
    if(!member) return message.reply('You need to mention whom to ban!')
    if(member.highestRole.position >= executor.highestRole.position) return message.reply('I cannot ban someone with higher than or equal to your own role')
    if(me.highestRole.position <= member.highestRole.position) return message.reply('I cannot ban someone with higher than or equal to my own role')
    if(!member.bannable) return message.reply('I cannot ban this member')
    
    //Other definitions
    let guild = message.guild.name;
    let responsible = message.author.id
    let reason = args[1]
    
    //Logs the ban
    let embed = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} banned`)
    .setDescription(`${member.id}`)
    .addField('Executor', `${executor.user.username}#${executor.user.discriminator} - ${executor.id}`)
    .addField('Reason', `${reason}`)
    let log = message.guild.channels.find(c => c.name.match('bot-logs')).then(channel => channel.send(embed))
    
    //Ban execution
    member.user.send(`You have been banned from ${guild} by <@${responsible}> reason: ${reason}`)
    .then(member.ban(`${reason}`)).catch(console.error)
    
	},
};