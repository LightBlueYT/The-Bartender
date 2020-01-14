const Discord = require('discord.js')
module.exports = {
	name: 'setconf',
	description: 'Manage the configuration',
  category: 'Moderation',
	execute(message, guildConf, args, client) {

    const adminRole = message.guild.roles.find(r => r.name === guildConf.adminRole);
    if(!adminRole) return message.reply("Administrator Role Not Found");
    
    if(!message.member.roles.has(adminRole.id)) {
      return message.reply("You're not an admin, sorry!");
    }
    

    const [prop, ...value] = args;

    if(!client.settings.has(message.guild.id, prop)) {
      return message.reply("This key is not in the configuration.");
    }
    

    client.settings.set(message.guild.id, value.join(" "), prop);
    
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
  }
  }