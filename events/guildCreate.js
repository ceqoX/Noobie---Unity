const client = require('../index');
const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;

client.on('guildCreate', (guild) => {
    let channelToSendTo;

    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === 'text' &&
            !channelToSendTo &&
            channel.permissionsFor(guild.me).has('SEND_MESSAGES')
        )
            channelToSendTo = channel;
    });

    if (!channelToSendTo) return;

    const newGuildEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setTitle(`Thank you for inviting ${client.user.username}`)
        .setDescription(`Use ${prefix} help to see all the commands I have !`)
        .addField('INFORMATION', '» [Invite](https://discord.com/oauth2/authorize?client_id=710335645255729183&permissions=42949672878&scope=bot) the bot to your server \n » [Join](https://discord.gg/VcmMB9zRsV) the support server')
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL());

    channelToSendTo.send(newGuildEmbed);
});