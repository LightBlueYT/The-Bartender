const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
	name: 'bot',
	description: 'Shows bot information',
  category: 'Informational',
	execute(message, guildConf, args, client) {
    
    const usersHuman = client.users.filter(user => !user.bot).size;
    const usersBots = client.users.filter(user => user.bot).size;
    const guilds = client.guilds.size;
    const emojis = client.emojis.size;
    const uptime = ms(client.uptime);
    const ping = Math.floor(client.ping);
    const version = client.config.version;
    const picture = client.user.displayAvatarURL;
    
    
    let embed = new Discord.RichEmbed()
    .setTitle(`Bot Info`)
    .addField(`Users`, usersHuman, true)
    .addField(`Bots`, usersBots, true)
    .setThumbnail(picture)
    .addField(`Emojis`, emojis, true)
    .addField(`Guilds`, guilds, true)
    .addField(`Uptime`, uptime, true)
    .addField(`Ping`, ms(ping), true)
    .addField(`Version`, version, true)
    
    
    message.channel.send(embed)
  },
};