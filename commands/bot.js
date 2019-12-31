const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
	name: 'bot',
	description: 'Shows bot information',
  category: 'Informational',
	execute(message, args, client) {
        
    const users = message.client.users.size;
    const guilds = client.guilds.size;
    const emojis = client.emojis.size;
    const channels = client.channels.size;
    const uptime = ms(client.uptime);
    const ping = ms(client.ping);
    const user = `${client.user.username}#${client.user.discriminator}`;
    const version = client.config.version;
    const creatorName = client.users.get('232466273479426049').username;
    const creatorDis = client.users.get('232466273479426049').discriminator;
    const pfp = client.user.displayAvatarURL;
    
    const embed = new Discord.RichEmbed()
    .setTitle(user)
    .setColor('RANDOM')
    .addField('User count', users, true)
    .addField('Guild count', guilds, true)
    .addField('Channel count', channels, true)
    .setThumbnail(pfp)
    .addField('Emoji count', emojis, true)
    .addField('uptime', uptime, true)
    .addField('ping', ping, true)
    .setFooter(`Creator: ${creatorName}#${creatorDis}, Version: ${version}, Dev build: ${client.config.DevVersion}`)
    
    message.channel.send(embed)
  },
};
