require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.command = new Collection();

["event", "command"].forEach((file) => require(`./handlers/${file}`)(client));

client.login(process.env.TOKEN);
