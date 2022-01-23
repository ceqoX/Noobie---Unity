const Discord = require('discord.js');

module.exports = {
    name: 'simjoin',
    permissions: ['ADMINISTRATOR'],
    aliases: ['join'],
    category: 'simulation',
    description: 'Simulate user join server',

    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont\'t have the requiered permission');

        client.on('guildMemeberAdd', member => {
            message.channel.send(`${member} has joined the server !`);
        });

        client.emit('guildMemberAdd', message.member);
    },
};