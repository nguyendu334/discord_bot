const { servers } = require('../data/server');

module.exports = {
    name: 'clear',
    async execute(message) {
        const server = servers[message.guild.id];
        if (server) {
            server.queue = [];
            message.channel.send('🧹 Cleaned ordered list!');
        } else {
            message.channel.send('❌ Nothing to clear!');
        }
    },
};
