const { servers } = require('../data/server');

module.exports = {
    name: 'pause',
    async execute(message) {
        const server = servers[message.guild.id];
        if (server) {
            if (server.dispatcher && server.playing) {
                message.channel.send('⏸ Paused').then(() => server.dispatcher.pause());
            }
        } else message.channel.send('❌ Nothing to pause!');
    },
};
