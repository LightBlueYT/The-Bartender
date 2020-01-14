module.exports = async (client, guild) => {
  
  const humans = guild.members.filter(member => !member.user.bot).size;
  const bots = guild.members.filter(member => member.user.bot).size;
  const total = guild.members.size;
  const Member = guild.roles.find(r => r.name === 'Members');
  const Mod = guild.roles.find(r => r.name === 'Moderator');
  const Admin = guild.roles.find(r => r.name === 'Administrator');
  const Owners = guild.roles.find(r => r.name === 'Owner');
  const Muted = guild.roles.find(r => r.name === 'Muted');  
  
  if(!Member) await guild.createRole({name: 'Members', color: 'GOLD', hoist: true, position: 1, permissions: 70618177, mentionable: true})
  if(!Muted) await guild.createRole({name: 'Muted', color: 'GREY', hoist: false, position: 2, permissions: 66560, mentionable: true})
  if(!Mod) await guild.createRole({name: 'Moderator', color: 'GOLD', hoist: true, position: 3, permissions: 209038403, mentionable: true})
  if(!Admin) await guild.createRole({name: 'Administrator', color: 'GOLD', hoist: true, position: 4, permissions: 8, mentionable: true})
  if(!Owners) await guild.createRole({name: 'Owner', color: 'GOLD', hoist: true, position: 5, permissions: 8, mentionable: true})
  
  const roleId = guild.roles.find(r => r.name === 'Members').id;
  
  const log = guild.channels.find(c => c.name.match('bot-logs'))
  if(!log) guild.createChannel(`bot-logs`, {type: 'text', permissionOverwrites: [{id: roleId, deny: ['SEND_MESSAGES'], allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']}] })
  
  const HC = guild.channels.find(c => c.name.match('Human count:'));
  const BC = guild.channels.find(c => c.name.match('Bot count:'));
  const MC = guild.channels.find(c => c.name.match('Member count:'));
  const WC = guild.channels.find(c => c.name.match('welcome'));
  
  if(!HC) await guild.createChannel(`Human count: ${humans}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] })
  if(!BC) await guild.createChannel(`Bot count: ${bots}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] })
  if(!MC) await guild.createChannel(`Member count: ${total}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] })
  if(!WC) await guild.createChannel(`welcome`, {type: 'text', permissionOverwrites: [{id: roleId, deny: ['SEND_MESSAGES'], allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']}] })
  
  function permLoop() {
    let channels = guild.channels.array();
    for (let i = 0; i < channels.length; i++) {
    client.channels.get(channels[i].id).overwritePermissions(Member, {VIEW_CHANNELS: true, READ_MESSAGE_HISTORY: true})
    client.channels.get(channels[i].id).overwritePermissions(guild.id, {VIEW_CHANNELS: true, READ_MESSAGE_HISTORY: true})
    client.channels.get(channels[i].id).overwritePermissions(Muted, {SEND_MESSAGES: false, VIEW_CHANNELS: true, READ_MESSAGE_HISTORY: true})
    }
  }
  client.setInterval(permLoop, 10*1000)
  
  guild.owner.user.send(`
  Thanks for using ${client.user.username}#${client.user.discriminator}. \nAs you read this the bot has set up server stats & roles those roles are simply a setup. \n**OBS** Changing the server stats channel names will break them. Same with the roles changing their names will break them. You can change anything else expect the names.`)
}