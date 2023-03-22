const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();

// kick member
module.exports = {
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
};

client.login(process.env.TOKEN);
