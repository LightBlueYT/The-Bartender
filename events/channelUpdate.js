const Discord = require('discord.js')
module.exports = async (client, oChan, nChan) => {
  
  let embed = new Discord.RichEmbed()
  .setTitle(`Channel was edited <#${nChan.id}>`)
  .setDescription(`Pre edit: <${oChan.id}>\nAfter edit: <#${nChan.id}>`)
  if(oChan.name !== nChan.name)  embed.addField(nChan.name, oChan.name)
  if(oChan.type !== nChan.type)  embed.addField(nChan.type, oChan.type)
  
  
}