module.exports = {
	name: 'prune',
	description: 'Prunes a channel from latest messages',
  category: 'Moderation',
	execute(message, guildConf, args, client) {
  
    let executor = message.member;
    let me = message.guild.me;
    
    if(!executor.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have access to this command.');
    if(!me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I can\'t prune this channel im missing the `MANAGE_MESSAGES` permission');
    
    message.channel.bulkDelete(100, true).then(m => message.channel.send(`Deleted ${m.size} messages`)).then(m => m.delete(4000))
	},
};