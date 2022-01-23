const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    permissions: ['SEND_MESSAGES'],
    aliases: ['p', 'checkping'],
    category: 'info',
    description: 'Bot Ping',

    run: async (client, message, args) => {
        const msg = await message.channel.send('Pingping....');
        const PingEmbed = new Discord.MessageEmbed()
            .setTitle('Pong !')
            .setDescription(`${client.ws.ping} ms`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());

        await message.channel.send(PingEmbed);
        msg.delete();
    setTimeout(message.delete.bind(message), 1000)
    }
};