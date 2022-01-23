const client = require('../index');
const Discord = require('discord.js');
// Create Pings Collection
const Pings = new Discord.Collection();

client.on("message", (message) => {
    const mentionedMembers = message.mentions.members.first();

    if (!mentionedMembers) return;
    if (!mentionedMembers.id === message.author.id) return;
    const timeout = 60000;
    Pings.set(`Pinged : ${mentionedMembers.id}`, Date.now() + timeout);

    setTimeout(() => {
        Pings.delete(`Pinged : ${mentionedMembers.id}`);
    }, timeout);
});

client.on('messageDelete', (message) => {
    const mentionedMembers = message.mentions.members.first();

    if (!mentionedMembers) return;
    if (!mentionedMembers.id === message.author.id) return;

    const ghostPingsLogsChannel = message.guild.channels.cache.find(ch => ch.name.includes('ghostping'));

    if (Pings.has(`Pinged : ${mentionedMembers.id}`)) {
        const ghostpingDetectedEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('GHOST PING DETECTED')
            .addField('Author', message.author)
            .addField('Message Content', message.content)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());

        ghostPingsLogsChannel.send(ghostpingDetectedEmbed);
    }
});