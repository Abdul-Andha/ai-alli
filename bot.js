//Requires
require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

//Setting new client
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

//Slash Command Handler
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const commands = [];
bot.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	bot.commands.set(command.data.name, command);
}

//Permissions Handler


//Event Handler
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args, commands))
	} else {
		bot.on(event.name, (...args) => event.execute(...args, commands))
	}

}

//Login
bot.login(process.env.TOKEN);