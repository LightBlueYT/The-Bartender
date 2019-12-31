module.exports = (client, message) => {
  function getUsers() {
    let guilds = client.guilds.array();
    for (let i = 0; i < guilds.length; i++) {
      client.guilds.get(guilds[i].id).fetchMembers()
    };
  }
  console.log(`Client has been started as ${client.user.username}#${client.user.discriminator}. \nLoaded Dev-Build: ${client.config.DevVersion}. \nLoaded Version: ${client.config.version}`)
  console.log('Dont forget to update the github!')
}