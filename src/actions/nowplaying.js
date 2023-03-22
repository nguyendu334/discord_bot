const { MessageEmbed } = require('discord.js');

const { formatTimeRange } = require('../utils/time');
const { servers } = require('../data/server');

module.exports = {
    name: ['nowplaying'],
    async execute(message) {
        const server = servers[message.guild.id];
        if (server) {
            if (!server.playing) {
                message.channel.send('❌ Nothing is played now!');
            } else {
                const song = server.playing.song;
                const messageEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(song.resource.title)
                    .setAuthor(`Playing 🎵 `)
                    .setThumbnail(song.resource.thumbnail)
                    .addFields(
                        { name: 'Channel', value: song.resource.author, inline: true },
                        {
                            name: 'Length',
                            value: formatTimeRange(song.resource.length),
                            inline: true,
                        },
                    );
                message.channel.send(messageEmbed);
            }
        } else {
            message.channel.send('❌ Nothing is played now!');
        }
    },
};
