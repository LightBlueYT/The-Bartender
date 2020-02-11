const config = require('../config.json');

module.exports = {
	name: 'reset',
	description: 'reset',
  category: 'BotDev',
	execute(message, guildConf, args, client) {
          
  if(message.member.id !== config.owner) return message.author.send('You do not have access to Bot Commands.');
    
  client.destroy().then(m => message.channel.send('Bot restarting...'))
  client.login(config.token).then(m => message.channel.send('Bot restarted...'))

	},
};