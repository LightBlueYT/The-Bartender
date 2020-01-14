const defaultSettings = {
  prefix: "!",
  modLogChannel: "bot-logs",
  muteRole: "Muted",
  modRole: "Moderator",
  adminRole: "Administrator",
  welcomeChannel: "welcome",
  welcomeMessage: "Welcome {{user}}",
  joinRole: "Members"
}
module.exports = async (client, message) => {
  const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

	if (!message.content.startsWith(guildConf.prefix) || message.author.bot) return;

	const args = message.content.slice(guildConf.prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

try {
	client.commands.get(command).execute(message, guildConf, args, client);
} catch (error) {
	console.error(error);
	message.reply(`Hmm, seems like the command you used dont exist.`);
}
}