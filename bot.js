//Requires
require('dotenv').config();
import { readdirSync } from 'fs';
import { Client, Intents, Collection } from 'discord.js';

//Setting new client
const bot = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});

//Slash Command Handler
const commandFiles = readdirSync("./commands").filter(file => file.endsWith(".js"));
const commands = [];
bot.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	bot.commands.set(command.data.name, command);
}

//Permissions Handler



//Message Command Handler
bot.msgCommands = new Collection();
const msgCommandFiles = readdirSync('./msgCommands/').filter(file => file.endsWith('.js'));

for (const file of msgCommandFiles) {
	const command = require(`./msgCommands/${file}`);
	bot.msgCommands.set(command.name, command);
}

//Event Handler
const eventFiles = readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args, commands))
	} else if (event.name === "messageCreate") {
		bot.on("messageCreate", receivedMessage => event.execute(receivedMessage, bot.msgCommands, bot))
	} else {
		bot.on(event.name, (...args) => event.execute(...args, commands))
	}

}

//Login
bot.login(process.env.TOKEN);