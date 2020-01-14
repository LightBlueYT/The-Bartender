const Discord = require('discord.js')
module.exports = {
	name: 'config',
	description: 'Show configuration',
  category: 'Moderation',
	execute(message, guildConf, args, client) {
    let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}`;
    }).join('\n');
    message.channel.send(`The following are the server's current configuration: \`\`\`${configProps}\`\`\``);
    }
  }