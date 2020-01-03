const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
	name: 'mute',
	description: 'Mutes a member',
  category: 'Moderation',
	execute(message, args, client) {
    
    //Checks if the Muted role exists already
    let muted = message.guild.roles.find(r => r.name.match('Muted'));
    if(!muted) message.channel.send('It seems like the Muted role dont exist here let me make one, and then mute the member again.').then(message => message.guild.createRole({name: 'Muted', color: 'GREY', hoist: false, position: 2, permissions: 66560, mentionable: true}))
    
    //Definitions
    let member = message.mentions.members.first();
    let author = message.member;
    let me = message.guild.me;
    let log = message.guild.channels.find(c => c.name.match('bot-logs'))
    let time = args[1]
    let reason = args[2]
    
    //Checks if the mute can be executed
    if(!member) return message.channel.send('Please mention who to mute')
    if(member.highestRole.position >= author.highestRole.position) return message.channel.send('I cant mute someone with higher than or equal to your role')
    if(me.highestRole.position <= member.highestRole.position) return message.channel.send('I cant mute someone with higher than or equal to my role')
    if(!author.hasPermission('MANAGE_ROLES')) return message.channel.send('You dont have `MANAGE_ROLES` permission')
    if(!me.hasPermission('MANAGE_ROLES')) return message.channel.send('I dont have `MANAGE_ROLES` permission')
    
    function removeMute() {
      let ebmed = new Discord.RichEmbed()
      .setTitle(`${member.user.tag} was unmuted`)
      member.removeRole(muted)
      log.send(`Member ${member} has been unmuted.`)
    }
    
    let embed = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} Muted`)
    .setDescription(`${member.id}`)
    .addField(`Executor`, `${author.user.tag}`)
    .addField(`Time`, `${ms(ms(time))}`)
    .addField(`Reason`, `${reason}`)
    
    //Mutes the member
    member.addRole(muted).then(client.setTimeout(removeMute, ms(time)))
    log.send(embed)
	},
};