// kick member
module.exports = {
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
    run: async (client, interaction) => {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (target.id === interaction.user.id) {
            return interaction.reply({
                content: 'You can\'t kick yourself!',
                ephemeral: true,
            });
        }

        if (target.id === client.user.id) {
            return interaction.reply({
                content: 'You can\'t kick me!',
                ephemeral: true,
            })
        }

        if (target.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({
                content: 'You can\'t kick this member!',
                ephemeral: true,
            });
        }

        if (!target.kickable) {
            return interaction.reply({
                content: "I can't kick this member!",
                ephemeral: true,
            })
        }

        interaction.reply({
            content: `Kicked ${target.id}!`,
        });

        target.send({
            content: `You were kicked from ${interaction.guild.name} for ${reason}!`,   
        }).catch(() => {});

        target.kick(reason).catch(() => {})
    }
}