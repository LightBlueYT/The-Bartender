const Discord = require('discord.js')
module.exports = {
	name: 'kick',
	description: 'Kick an member',
  category: 'Moderation',
	execute(message, args, client) {
    
    //Permission checks
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You dont have the needed permission `KICK_MEMBERS`')
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('I dont have the needed permission `KICK_MEMBERS`')
    
    //Blocks executor to kick themself
    let mod = message.member;
    let person = message.mentions.members.first();
    if(person.id === mod.id) return message.reply('You cannot kick yourself.')
    
    //Further checking to know if the member can be kicked
    let executor = message.member;
    let member = message.mentions.members.first();
    let me = message.guild.me
    if(!member) return message.reply('You need to mention whom to kick!')
    if(member.highestRole.position >= executor.highestRole.position) return message.reply('I cannot kick someone with higher than or equal to your own role')
    if(me.highestRole.position <= member.highestRole.position) return message.reply('I cannot kick someone with higher than or equal to my own role')
    if(!member.kickable) return message.reply('I cannot kick this member')
    
    //Other definitions
    let guild = message.guild.name;
    let responsible = message.author.id
    let reason = args[1]
    
    //Logs the kick
    let embed = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} kicked`)
    .setDescription(`${member.id}`)
    .addField('Executor', `${executor.user.username}#${executor.user.discriminator} - ${executor.id}`)
    .addField('Reason', `${reason}`)
    let log = message.guild.channels.find(c => c.name.match('bot-logs')).then(channel => channel.send(embed))
    
    //Kick execution
    member.user.send(`You have been kicked from ${guild} by <@${responsible}> reason: ${reason}`)
    .then(member.kick(`${reason}`)).catch(console.error)
    
	},
};