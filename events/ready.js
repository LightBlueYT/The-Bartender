module.exports = (client, message) => {  
  console.log(`Client has been started as ${client.user.username}#${client.user.discriminator}. \nLoaded Dev-Build: ${client.config.DevVersion}. \nLoaded Version: ${client.config.version}`)
}