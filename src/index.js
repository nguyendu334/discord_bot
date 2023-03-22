// Requirements and Variables
const keepAlive = require(`./server`);
require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// actions
const clear = require('./actions/clear');
const nowplaying = require('./actions/nowplaying');
const pause = require('./actions/pause');
const play = require('./actions/play');
const resume = require('./actions/resume');
const skip = require('./actions/skip');
const stop = require('./actions/stop');

// const ping = require('./commands/ping');
// const kick = require('./commands/kick');
// const ban = require('./commands/ban');
// const mute = require('./commands/mute');

// Array of Command objects
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: 'online',
        activities: [
            {
                name: 'Visual Studio Code',
                type: ActivityType.Playing,
            },
        ],
    });
});

const prefix = "!";

client.on("message", (message) => {
    const args = message.content.substring(prefix.length).split(" ");
    const content = message.content.substring(prefix.length + args[0].length);

    if (message.content[0] === "!") {
      switch (args[0]) {
        case play.name:
          play.execute(message, content);
          break;
        case skip.name:
          skip.execute(message);
          break;
        case nowplaying.name.toString():
          nowplaying.execute(message);
          break;
        case pause.name:
          pause.execute(message);
          break;
        case resume.name:
          resume.execute(message);
          break;
        case stop.name:
          stop.execute(message);
          break;
        case clear.name:
          clear.execute(message);
          break;
        // More short command
        case "np":
          nowplaying.execute(message);
          break;
        case "fs":
          skip.execute(message);
          break;
      }
    }
  });

const cmds = [
    {
        name: `ping`, // Command name
        description: `Ping!`, // Command description
        async execute(interaction) {
            // Execute function
            await interaction.reply({
                content: `Pong ${client.ws.ping}ms!`,
            });
        },
    },
    {
        // kick member
        name: 'kick',
        description: 'Kick a member!',
        default_member_permissions: 2,
        options: [
            {
                name: 'target',
                description: 'The member to kick',
                type: 6,
                required: true,
            },
            {
                name: 'reason',
                description: 'The reason for kicking the member',
                type: 3,
                required: false,
            },
        ],
        async execute(interaction) {
            const target = interaction.options.getMember('target');
            const reason = interaction.options.getString('reason') || 'No reason provided';

            if (target.id === interaction.user.id) {
                return interaction.reply({
                    content: "You can't kick yourself!",
                    ephemeral: false,
                });
            }

            if (target.id === client.user.id) {
                return interaction.reply({
                    content: "You can't kick me!",
                    ephemeral: false,
                });
            }

            // // check roles
            // if (target.roles.highest.position <= interaction.member.roles.highest.position) {
            //     return interaction.reply({
            //         content: "You can't kick this member!",
            //         ephemeral: false,
            //     });
            // }

            if (!target.kickable) {
                return interaction.reply({
                    content: "I can't kick this member!",
                    ephemeral: false,
                });
            }

            interaction.reply({
                content: `Kicked ${target.id}!`,
            });

            target
                .send({
                    content: `You were kicked from ${interaction.guild.name} for ${reason}!`,
                })
                .catch(() => {});

            target.kick(reason).catch(() => {});
        },
    },
    {
        // ban member
        name: 'ban',
        description: 'Ban a member!',
        default_member_permissions: 4,
        options: [
            {
                name: 'target',
                description: 'The member to ban',
                type: 6,
                required: true,
            },
            {
                name: 'reason',
                description: 'The reason for banning the member',
                type: 3,
                required: false,
            },
        ],
        async execute(interaction) {
            const target = interaction.options.getMember('target');
            const reason = interaction.options.getString('reason') || 'No reason provided';

            if (target.id === interaction.user.id) {
                return interaction.reply({
                    content: "You can't ban yourself!",
                    ephemeral: false,
                });
            }

            if (target.id === client.user.id) {
                return interaction.reply({
                    content: "You can't ban me!",
                    ephemeral: false,
                });
            }

            if (target.roles.highest.position <= interaction.member.roles.highest.position) {
                return interaction.reply({
                    content: "You can't ban this member!",
                    ephemeral: false,
                });
            }

            if (!target.bannable) {
                return interaction.reply({
                    content: "I can't ban this member!",
                    ephemeral: false,
                });
            }

            interaction.reply({
                content: `Banned ${target.id}!`,
            });

            target
                .send({
                    content: `You were banned from ${interaction.guild.name} for ${reason}!`,
                })
                .catch(() => {});

            target.ban({ reason }).catch(() => {});
        },
    },
    {
        // mute member
        name: 'mute',
        description: 'Mute a member!',
        default_member_permissions: 4194304,
        options: [
            {
                name: 'target',
                description: 'The member to mute',
                type: 6,
                required: true,
            },
            {
                name: 'reason',
                description: 'The reason for muting the member',
                type: 3,
                required: false,
            },
        ],
        async execute(interaction) {
            const target = interaction.options.getMember('target');
            const reason = interaction.options.getString('reason') || 'No reason provided';

            if (target.id === interaction.user.id) {
                return interaction.reply({
                    content: "You can't mute yourself!",
                    ephemeral: false,
                });
            }

            if (target.id === client.user.id) {
                return interaction.reply({
                    content: "You can't mute me!",
                    ephemeral: false,
                });
            }

            // check roles
            if (target.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({
                    content: "You can't mute this member!",
                    ephemeral: false,
                });
            }

            if (!target.kickable) {
                return interaction.reply({
                    content: "I can't mute this member!",
                    ephemeral: false,
                });
            }

            interaction.reply({
                content: `Muted ${target.id}!`,
            });
        },
    },
];

// Interaction Create Event
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        cmds.forEach(async (command) => {
            if (interaction.commandName == command.name) {
                try {
                    await command.execute(interaction);
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }
});


// Bot Login
client.login(process.env.TOKEN);
keepAlive();
