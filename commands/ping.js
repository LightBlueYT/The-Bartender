module.exports = {
	name: 'ping',
	description: 'Ping!',
  category: 'System',
	execute(message) {
		message.channel.send(`${Math.floor(message.client.ping)}ms`).catch(console.error);
	},
};