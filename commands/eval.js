module.exports = {
	name: 'eval',
	description: 'eval',
  category: 'System',
	execute(message, args, client) {
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  const argsone = message.content.split(" ").slice(1);
 
  if (message.content.startsWith(client.config.prefix + "eval")) {
    if(message.author.id !== client.config.owner) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
    
  },
};