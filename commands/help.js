const { prefix } = require('../config.json');
const Discord = require('discord.js')
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
  category: 'Informational',
	execute(message, args, client) {
const data = [];
const { commands } = message.client;

if (!args.length) {
const embed = new Discord.RichEmbed()
.setTitle('Commands')
.setColor('RANDOM')
.setDescription(commands.map(command => command.name).join('\n '))
.setFooter(`You can send ${prefix}help [command name] to get info on a specific command!`)
return message.author.send(embed)
	.then(() => {
		if (message.channel.type === 'dm') return;
		message.reply('I\'ve sent you a DM with all my commands!');
	})
	.catch(error => {
		console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
		message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
	});
}
    const name = args[0].toLowerCase();
const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

if (!command) {
	return message.reply('that\'s not a valid command!');
}
const embed = new Discord.RichEmbed()
.setTitle(command.name)
.setColor('RANDOM')

if (command.description){ 
  embed
.addField('Description', command.description)
}
if (command.category){
  embed
.addField('Category', command.category)
}
if (command.usage){
  embed
.addField('Usage', command.usage)
}


message.channel.send(embed);

	},
};