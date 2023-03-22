const { servers } = require('../data/server');

module.exports = {
    name: 'resume',
    async execute (message) {
        const server = servers[message.guild.id];
        if (server) {
            if (server.dispatcher && server.playing) {
                server.dispatcher.resume();
                message.channel.send('⏯ Resume');
            } else message.channel.send('❌ Nothing to resume!');
        } else message.channel.send('❌ Nothing to resume!');
    },
};
