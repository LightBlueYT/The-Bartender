module.exports = async (client, oMember, nMember) => {

  let parent = nMember.guild.channels.find(c => c.name === 'Dynamic Voice');
  let channel = nMember.guild.channels.find(c => c.name === 'Create Channel');
  let chName = `${nMember.displayName}'s Channel`;
  
  if(nMember.voiceChannel === channel){
    nMember.guild.createChannel(chName, {
      type: 'voice',
      parent: parent,
      permissionOverwrites: [{
        id: nMember.id,
        allow: ['MANAGE_CHANNELS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS']
      }]
    }).then(channel => nMember.setVoiceChannel(channel)).catch(console.error)
  }

  let chan;
  if(nMember.voiecChannel === undefined) chan = nMember.guild.channels.find(c => c.name === chName)
  if(oMember.voiceChannelID !== nMember.voiceChannelID) chan = chan = oMember.guild.channels.find(c => c.name === chName)
  
  if(chan === undefined) return;
  if(chan.members.size === 0){
    chan.delete().catch(console.error)
  }
  
  if(oMember.voiceChannel === undefined){
    chan.delete().catch(console.error)
  }
  
  if(nMember.voiceChannel === undefined){
    chan.delete().catch(console.error)
  }
}