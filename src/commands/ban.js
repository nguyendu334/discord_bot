const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();

const { servers } = require('../data/server');

// kick member
module.exports = {
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
};

client.login(process.env.TOKEN);
