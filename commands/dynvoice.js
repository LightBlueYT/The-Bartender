module.exports = {
	name: 'dynvoice',
	description: 'Creates a dynamic voice system creating more than 1 may cause bugs!',
  category: 'Voice',
	execute(message, args, client) {
  
    let member = message.member;
    let me = message.guild.me;
    let role = message.guild.roles.find(r => r.name.match('Members'));
    let category = message.guild.channels.find(c => c.name === 'Dynamic Voice');
    
    if(!member.hasPermission('MANAGE_GUILD')) return message.reply(`You don't have the \`MANAGE_GUILD\` permission`)
    if(!me.hasPermission('MANAGE_GUILD')) return message.reply(`I don't have the \`MANAGE_GUILD\` permission`)
    
    if(category) return message.channel.send('Oops seems like the dynamic voice channel is already setup!')
    message.guild.createChannel('Dynamic Voice', {
      type: 'category'
    }).then(parent => 
        message.guild.createChannel('Create Channel', {
          type: 'voice',
          parent: parent,
          permissionOverwrites: [{
            id: role.id,
            deny: ['SPEAK'],
            allow: ['CONNECT']
          }]
        })
          )
    
    
    message.guild.createChannel('Create Channel', {
      type: 'voice',
      parent: message.guild.channels.find(c => c.name === 'Dynamic Voice').id,
      permissionOverwrites: [{
        id: role.id,
        deny: ['SPEAK'],
        allow: ['CONNECT']
      }]
    })
    
    message.channel.send('Successfully created a dynamic voice channel! \nYou may have to tweak around in the channel settings!')
	},
};