const Discord = require('discord.js');
const { Database } = require('quickmongo');
const mongoDBURL = require('../../config.json').mongoDBURL;
const quickmongo = new Database(mongoDBURL);

module.exports = {
    name: 'afk',
    permissions: ['SEND_MESSAGES'],
    category: 'utility',
    description: 'Set Status to AFK',

    run: async (client, message, args) => {
        let reason = args.join(' ');
        const AFKPrefix = '[AFK]';

        if (!reason) reason = 'No AFK reason provided';

        // Set AFK Status (Add to Database)
        try {
            await quickmongo.set(`afk-${message.author.id}+${message.guild.id}`, reason);
            message.channel.send('You have set your Status to AFK');
        } catch {
            console.log(err);
            message.channel.send('Could not set AFK status');
        }


        try {
            await message.member.setNickname(AFKPrefix + message.member.user.username);
        } catch (err) {
            console.log(err);
            message.channel.send('Cannot set nickname');
        }
    }
};