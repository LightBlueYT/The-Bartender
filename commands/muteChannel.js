module.exports = {
	name: 'muteperm',
	description: 'muteperm channel true/false, muteperm category true/false',
  category: 'Moderation',
	execute(message, args, client) {
    
    //Checks for permissions
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You dont have the `MANAGE_CHANNELS` permission')
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply('I dont have the `MANAGE_CHANNELS` permission')
    
    //Find the muted role
    let muted = message.guild.roles.find(r => r.name.match('Muted'));
    
    //Checks whats supposed to be set
    if(message.content.toLowerCase().includes('false')){
      if(message.content.toLowerCase().includes('channel')){
        message.channel.overwritePermissions(muted, {VIEW_CHANNEL: true, SEND_MESSAGES: false}).then(updated => message.channel.send(`${muted} message permission in channel \`${message.channel.name}\: TRUE\``))
      }
      if(message.content.toLowerCase().includes('category')){
        message.channel.parent.overwritePermissions(muted, {VIEW_CHANNEL: true, SEND_MESSAGES: false}).then(updated => message.channel.send(`${muted} message permission in category \`${message.channel.parent.name}: TRUE\``))
      }
    }
    if(message.content.toLowerCase().includes('true')){
      if(message.content.toLowerCase().includes('channel')){
        message.channel.overwritePermissions(muted, {VIEW_CHANNEL: true, SEND_MESSAGES: true}).then(updated => message.channel.send(`${muted} message permission in channel \`${message.channel.name}: FALSE\``))
      }
      if(message.content.toLowerCase().includes('category')){
        message.channel.parent.overwritePermissions(muted, {VIEW_CHANNEL: true, SEND_MESSAGES: true}).then(updated => message.channel.send(`${muted} message permission in category \`${message.channel.parent.name}: FALSE\``))
      }
    }
	},
};