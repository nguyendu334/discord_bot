module.exports = {
    name: `ping`, // Command name
    description: `Ping!`, // Command description
    async execute(interaction) { // Execute function
        await interaction.reply({
            content: `Pong! ${client.ws.ping}ms!`
        });
    }
}