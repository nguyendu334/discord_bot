const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();

// kick member
module.exports = {
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
    }
};

client.login(process.env.TOKEN);
