const Discord = require('discord.js');
const { get } = require('mongoose');

module.exports = {
    name: 'addemoji',
    permissions: ['MANAGE_EMOJIS'],
    category: 'utility',
    usage: '<emoji>',
    description: 'Add static and animated emojis to the server',

    run: (client, message, args) => {
        if (!args.length) return message.channel.send('Please specify some emojis to add to the server');

        for (const emojis of args) {
            const getEmoji = Discord.Util.parseEmoji(emojis);

            if (getEmoji.id) {
                const emojiExt = getEmoji.animated ? ".gif" : ".png";
                const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`;
                message.guild.emojis
                    .create(emojiURL, getEmoji.name)
                    .then(emoji =>
                        message.channel.send(`Successfully Added : ${emoji} (\`${emoji.name}\` to the server !`));
            }
        }
    },
};