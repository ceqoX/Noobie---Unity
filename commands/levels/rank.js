const Discord = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "rank",
  permissions: ["SEND_MESSAGES"],
  category: "levels",
  description: "Show user's rank",

  run: async (client, message, args) => {
    const target = message.mentions.users.first() || message.author; // Grab the target mentionedMember.user.id

    // Selects the target from the database.
    let user = await Levels.fetch(target.id, message.guild.id, true);

    if (!user)
      return message.channel.send(
        "Seems like this user has not earned any xp so far."
      ); // If there isnt such user in the database, we send a message in general.

    user.cleanXp = user.xp - Levels.xpFor(user.level);
    user.cleanNextLevelXp =
      Levels.xpFor(user.level + 1) - Levels.xpFor(user.level);

    //message.channel.send(`> **${targed.tag}** is currently level ${user.level}.`); // We show the level.

    const rank = new canvacord.Rank()
      .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
      .setBackground("COLOR", "#191a1c")
      .setOverlay("COLOR", false)
      .setCurrentXP(user.cleanXp)
      .setRequiredXP(user.cleanNextLevelXp)
      .setStatus(target.presence.status, true, true)
      .setRank(user.position)
      .setLevel(user.level)
      .setProgressBar("BLUE", "COLOR", true)
      .setProgressBarTrack("BLACK")
      .setUsername(target.username)
      .setDiscriminator(target.discriminator);

    rank.build().then((data) => {
      const attachment = new Discord.MessageAttachment(data, "RankCard.png");
      message.channel.send(attachment);
    });
    setTimeout(message.delete.bind(message), 1000);
  },
};
