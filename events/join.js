const client = require("../index");
const Discord = require("discord.js");
const config = require("../config.json");
const prefix = config.prefix;
const { Database } = require("quickmongo");
const mongoDBURL = require("../config.json").mongoDBURL;
const quickmongo = new Database(mongoDBURL);
const moment = require("moment");

client.on("guildMemberAdd", async (member) => {
  const welcomeChannel = member.guild.channels.cache.find(
    (channel) => channel.name === "neulinge"
  );

  let welcomeEmbed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`\`${member.user.tag}\``)
    .setThumbnail(
      member.user.displayAvatarURL({
        dynamic: true,
        size: 4096,
        format: "png",
      })
    )
    .setDescription(
      `**Account Infos** \n <@${member.id}> | Erstellt am: \`${
        member.user.createdAt
      }\` \n User ist das: \`${await member.guild.members.cache.filter(
        (u) => !u.user.bot
      ).size}\` Mitglied!`
    )
    .setTimestamp()
    .setFooter("© Neues Mitglied | ceqoX", client.user.displayAvatarURL());

  welcomeChannel.send(welcomeEmbed);

  const welcomeChannel2 = member.guild.channels.cache.find(
    (channel) => channel.name === "💭chat"
  );

  let joins = [
    `<a:ablobjoin:858140173996785714> | **Schön dich zu sehen** <@${member.id}> <a:DiscordLove:858140174122876938>`,
    `<a:ablobjoin:858140173996785714> | **Juhu, du hast es geschafft** <@${member.id}> <a:DiscordLove:858140174122876938>`,
    `<a:ablobjoin:858140173996785714> | <@${member.id}> **ist gelandet** <a:DiscordLove:858140174122876938>`,
    `<a:ablobjoin:858140173996785714> | **Willkommen,** <@${member.id}> **Wir hoffen du hast Pizza mitgebracht.** <a:DiscordLove:858140174122876938>`,
  ];

  let joinrotate = joins[Math.floor(Math.random() * joins.length)];

  welcomeChannel2.send(joinrotate);
});
