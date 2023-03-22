const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();


module.exports = {
    name: `ping`, // Command name
    description: `Ping!`, // Command description
    async execute(interaction) {
        // Execute function
        await interaction.reply({
            content: `Pong ${client.ws.ping}ms!`,
        });
    },
};

client.login(process.env.TOKEN);
