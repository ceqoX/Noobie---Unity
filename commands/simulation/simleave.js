const Discord = require('discord.js');

module.exports = {
    name: 'simleave',
    permissions: ['ADMINISTRATOR'],
    aliases: ['leave'],
    category: 'simulation',
    description: 'Simulate user leave server',

    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont\'t have the requiered permission');

        client.on('guildMemeberRemove', member => {
            message.channel.send(`${member} has left the server !`);
        });

        client.emit('guildMemberRemove', message.member);
    },
};