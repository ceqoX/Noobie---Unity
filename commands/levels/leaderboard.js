const Discord = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require("canvacord");

module.exports = {
    name: 'leaderboard',
    permissions: ['SEND_MESSAGES'],
    aliases: ['lb'],
    category: 'levels',
    description: "Show server\'s level leaderboard",

    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `\`${e.position}:\` **${e.username}#${e.discriminator}** mit **${e.xp.toLocaleString()}XP**`); // We map the outputs.

        const leaderboardEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setAuthor('LEADERBOARD | ceqoX', 'https://cdn.discordapp.com/attachments/830171021423411247/858137184628244510/pp.gif')
            .setDescription(`${lb.join("\n")}`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());

        message.channel.send(leaderboardEmbed);
        
    },
};