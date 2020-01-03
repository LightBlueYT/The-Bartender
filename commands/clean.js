module.exports = {
	name: 'clean',
	description: 'clean a channel fully',
  category: 'Moderator',
	execute(message, args, client) {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You dont have the `MANAGE_CHANNELS` permission')
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I dont have the `MANAGE_CHANNELS` permission')
    const channel = message.channel;
    const parent = message.channel.parentID;
    channel.clone(channel.name, true, true).then(clone => clone.edit({parent: `${parent}`})).then(clone => clone.send('All messages have been deleted')).then(msg => msg.delete(3000))
    channel.delete()
	},
};