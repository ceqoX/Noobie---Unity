const client = require('../index');
const Discord = require('discord.js');
// Canvacord
const canvacord = require('canvacord');
// Quick Mongo
const { Database } = require('quickmongo');
const mongoDBURL = require('../config.json').mongoDBURL;
const quickmongo = new Database(mongoDBURL);

client.on('guildMemberRemove', async (member) => {
    const leaveChannelCheck = await quickmongo.fetch(`leave-${member.guild.id}`);

    let leaver = new canvacord.Leaver()
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
        .setBackground('https://image.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg')
        .setColor('title', '#ffffff')
        .setColor('title-border', '#000000')
        .setColor('avatar', '#ffffff')
        .setColor('username', '#ffffff')
        .setColor('username-box', '#ff0000')
        .setColor('hastag', '#ff0000')
        .setColor('discriminator', '#ff0000')
        .setColor('discriminator-box', '#ff0000')
        .setColor('message', '#ffffff')
        .setColor('message-box', '#ff0000')
        .setColor('member-count', '#ffffff')
        .setColor('background', '#ff0000')
        .setColor('border', '#ffffff');

    if (leaveChannelCheck) {
        // Find Welcome Channel 

        const getleaveChannel = await quickmongo.get(`leave-${member.guild.id}`); // ID
        const leaveChannel = member.guild.channels.cache.get(getleaveChannel); // Channel

        leaver.build().then(data => {
            const attachments = new Discord.MessageAttachment(data, 'leaver.png');
            leaveChannel.send(`${member.user}`).then(leaveChannel.send(attachments));
        });
    } else return;
});