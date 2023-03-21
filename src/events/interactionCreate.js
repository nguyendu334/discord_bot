module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) {
        const command = client.command.get(interaction.commandName);

        if (!interaction.guild) return interaction.reply({
                content: 'This command can only be used in a server!',
                ephemeral: true,
            });
        

        if (!command) return interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });

        await command.run(client, interaction);
    }
};
