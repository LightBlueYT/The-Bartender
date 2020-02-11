const ms = require('ms');
const Discord = require('discord.js');
module.exports = {
	name: 'softban',
	description: 'Bans and unbans the user in the set time',
  category: 'Moderation',
	execute(message, args, client) {
    
    let members = message.mentions.members;
    let member = members.first();
    let executor = message.member;
    let me = message.guild.me;
    let id = member.id;
    let time = args[1];
    let guild = message.guild.name;
    let reason = args[2];
    let channel = message.guild.channel.find(c => c.name.match('logs'));
    
    
    if(!time) return message.channel.send(`Please tell a time for this user to be banned.`)
    if(members.size >= 2) return message.channel.send(`Please mention only one user.`);
    if(members.size <= 0) return message.channel.send(`Please mention someone to ban.`);
    if(!member.bannable) return message.channel.send(`This member can't be banned.`);
    if(!executor.hasPermission('BAN_MEMBERS')) return message.channel.send(`You don't have \`BAN_MEMBERS\` permission.`);
    if(!me.hasPermission('BAN_MEMBERS')) return message.channel.send(`I don't have \`BAN_MEMBERS\` permission.`);
    if(member.highestRole.position >= executor.highestRole.position) return message.channel.send(`I can't ban someone with a higher role than you.`);
    if(member.highestRole.position >= me.highestRole.position) return message.channel.send(`I can't ban someone with a higher role than mine.`);
    if(member.id === executor.id) return message.channel.send(`You can't ban yourself.`);
    
    
    let user = new Discord.RichEmbed()
    .setTitle(`Softbanned in ${guild}`)
    .setColor(`RANDOM`)
    .addField(`Executor`, `${executor.user.username}#${executor.user.discriminator} (${executor.user.id})`)
    .addField(`Reason`, reason)
    .addField(`Time`, ms(time))
    
    let server = new Discord.RichEmbed()
    .setTitle(`${member.user.tag} was softbanned`)
    .setColor(`RANDOM`)
    .addField(`Executor`, `${executor.displayName}`)
    .addField(`Reason`, reason)
    .addField(`Time`, ms(time))
    
    
    function unban() {
      message.guild.unban(id)
      
      let uUser = new Discord.RichEmbed()
      .setTitle(`Unbanned in ${guild}`)
      .setColor(`RANDOM`)
      
      let uServer = new Discord.RichEmbed()
      .setTitle(`${member.user.tag} was unbanned`)
      .setColor(`RANDOM`)
      
      member.user.send(uUser).then(x => channel.send(uServer))
    }
    
    
    member.user.send(user).then(x => channel.send(server))
    member.ban()
    client.setTimeout(unban(), ms(time))
	},
};