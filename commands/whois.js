const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'whois',
	description: 'Who is this?',
  category: 'Information',
	execute(message, args, client) {
  
    let member;
    let mention = message.mentions.members;
    
    if(mention) member = mention.first();

    let joined = new Date() - member.joinedAt 
    
    let isAdmin = false;
    let isOwner = false;
    let bot = false;
    
    if(member.hasPermission('ADMINISTRATOR')) isAdmin = true;
    if(member.id === message.guild.owner.id) isOwner = true;
    if(member.user.bot) bot = true;
    
    let embed = new Discord.RichEmbed()
    .setTitle(member.displayName)
    .setThumbnail(member.displayAvatarURL)
    .setDescription(`**Highestrole:** ${member.highestRole} \n**Is Owner:** ${isOwner} \n**Is Admin:** ${isAdmin} \n**Bannable:** ${member.bannable} \n**Kickable:** ${member.kickable} \n**Bot:** ${bot} \n**Joined:** ${ms(joined, {long: true})} ago`)

    
    message.channel.send(embed)
	},
};