const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    console.log(`Logged in as ${client.user.username}!`);

    await client.application.commands.set(client.command.map((x) => x));

    // set presence
    client.user.setPresence({
        status: 'online',
        activities: [
            {
                name: 'Visual Studio Code',
                type: ActivityType.Playing,
            },
        ],
    });
};
