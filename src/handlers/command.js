const path = require('path');
const fs = require('fs');

module.exports = async (client) => {
    const commandPath = path.join(__dirname, '..', 'commands');
    fs.readdirSync(commandPath).forEach((dir) => {
        const commandFile = fs.readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.js'));
        for (const file of commandFile) {
            const command = require(`../commands/${dir}/${file}`);
            client.command.set(command.name, command);
        }
    })
}