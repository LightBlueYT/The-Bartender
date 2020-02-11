const config = require('../config.json')

module.exports = {
	name: 'stop',
	description: 'stop',
  category: 'BotDev',
	execute(message, guildConf, args, client) {
  
    if(message.member.id !== config.owner) return message.author.send('You do not have access to bot commands')
  
    let user = client.users.get(config.owner);
    
    client.destroy().then(m => message.channel.send('Bot has been stopped...'))
    user.send(`Bot was stopped by <@${message.author.id}> in server ${message.guild.name}`)
    
	},
};