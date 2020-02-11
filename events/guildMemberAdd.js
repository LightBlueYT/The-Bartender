const Discord = require('discord.js')
const defaultSettings = {
  prefix: "!",
  modLogChannel: "bot-logs",
  muteRole: "Muted",
  modRole: "Moderator",
  adminRole: "Administrator",
  welcomeChannel: "welcome",
  welcomeMessage: "Welcome {{user}} to {{server}}",
}
module.exports = async (client, member) => {
  
  client.settings.ensure(member.guild.id, defaultSettings);
  let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");
  welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag);
  welcomeMessage = welcomeMessage.replace("{{server}}", member.guild.name);
  let wChan = client.settings.get(member.guild.id, "welcomeChannel");

  
  let channel = member.guild.channels.find(c => c.name === wChan);
  let mc = member.guild.channels.find(c => c.name.match('Human count'));
  let bc = member.guild.channels.find(c => c.name.match('Bot count'));
  let tc = member.guild.channels.find(c => c.name.match('Member count'));
  let members = member.guild.members.filter(m => !m.user.bot).size;
  let bots = member.guild.members.filter(m => m.user.bot).size;
  let total = member.guild.members.size;
  let Member = member.guild.roles.find(r => r.name === 'Members');

  
  if(!Member) await member.guild.createRole({name: 'Members', color: 'GOLD', hoist: true, position: 1, permissions: 70618177, mentionable: true}).catch(console.error)
  
  
  let roleId = member.guild.roles.find(r => r.name === 'Members').id

  
  member.addRole(roleId)
  
  
  if(!mc) await member.guild.createChannel(`Human count: ${members}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] }).catch(console.error)
  if(!bc) await member.guild.createChannel(`Bot count: ${bots}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] }).catch(console.error)
  if(!tc) await member.guild.createChannel(`Member count: ${total}`, {type: 'voice', permissionOverwrites: [{id: roleId, deny: ['CONNECT'], allow: ['VIEW_CHANNEL']}] }).catch(console.error)

  
  let embed = new Discord.RichEmbed()
  .setTitle(welcomeMessage)
  .setImage(member.user.displayAvatarURL)
  
  
  channel.send(embed)
}