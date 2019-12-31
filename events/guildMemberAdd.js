module.exports = async (client, member) => {
  
  const members = member.guild.members.filter(m => !m.user.bot).size,
        bots = member.guild.members.filter(m => m.user.bot).size,
        total = member.guild.members.size;
  
  const mc = member.guild.channels.find(c => c.name.match('Human count')),
        bc = member.guild.channels.find(c => c.name.match('Bot count')),
        tc = member.guild.channels.find(c => c.name.match('Member count'));
    
  const Member = member.guild.roles.find(r => r.name === 'Members');

  if(!Member) await member.guild.createRole({name: 'Members', color: 'GOLD', hoist: true, position: 1, permissions: 70618177, mentionable: true}).catch(console.error)
  
  const roleId = member.guild.roles.find(r => r.name === 'Members').id
  
  if(!mc) await member.guild.createChannel(`Human count: ${members}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] }).catch(console.error)
  if(!bc) await member.guild.createChannel(`Bot count: ${bots}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] }).catch(console.error)
  if(!tc) await member.guild.createChannel(`Member count: ${total}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] }).catch(console.error)

  await mc.edit({name: `Human count: ${members}`}).catch(console.error)
  await bc.edit({name: `Bot count: ${bots}`}).catch(console.error)
  await tc.edit({name: `Member count: ${total}`}).catch(console.error)
  
  const logs = member.guild.channels.find(c => c.name.match('bot-logs'));
  
  logs.send(`Welcome <@${member.id}> to **${member.guild.name}** enjoy your stay!`)
}