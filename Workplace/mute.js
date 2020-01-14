const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
	name: 'mute',
	description: 'Mutes a member',
  category: 'Moderation',
	execute(message, args, client) {
    
    const role = message.guild.roles.find(r => r.name.match('Muted'));
    const members = message.mentions.members;
    const member = members.first();
    const executor = message.member;
    const me = message.guild.me;
    const guild = message.guild.name;
    const reason = args[2];
    const time = args[1];
    const log = message.guild.channels.find(c => c.name.match('logs'));


    if(member.highestRole.position >= executor.highestRole.position) return message.channel.send(`I can't mute someone who has a higher role than yourself`)
    if(member.highestRole.position >= me.highestRole.position) return message.channel.send(`I can't mute someone who has a higher role than myself`)
    if(!executor.hasPermission('MANAGE_ROLES')) return message.channel.send(`You don't have the \`MANAGE_ROLES\` permission.`)
    if(!me.hasPermission('MANAGE_ROLES')) return message.channel.send(`I don't have the \`MANAGE_ROLES\` permission.`)
    if(members.size >= 2) return message.channel.send(`I'm only able to mute one member at a time.`)
    if(members.size === 0) return message.channel.esnd(`Please mention a member to mute`)
    

    let user = new Discord.RichEmbed()
    .setTitle(guild)
    .addField(`Executor`, executor.user.username)
    .addField(`Type`, `Mute`)
    .addField(`Time`, ms(ms(time)))
    .addField(`Reason`, reason)
    .setColor(`RANDOM`)
    
    let server = new Discord.RichEmbed()
    .setTitle(`${member.displayName} was muted`)
    .addField(`Time`, ms(ms(time)))
    .addField(`Reason`, reason)
    .addField(`Executor`, executor.displayName)
    .setColor(`RANDOM`)
    
    let user1 = new Discord.RichEmbed()
    .setTitle(`guild`)
    .setDescription(`You have now been umuted.`)
    .setColor(`RANDOM`)
    
    let server1 = new Discord.RichEmbed()
    .setTitle(`${member.displayName} was unmuted`)
    .setColor(`RANDOM`)
    
    
    function muteNo() {
      member.removeRole(role)
      member.user.send(user1)
      log.send(server1)
      .then(() => member.removeRole(role))
    }
    
    
    member.user.send(user)
    log.send(server)
    .then(() => member.addRole(role)).then(() => client.setTimeout(muteNo, ms(time)))
  },
};