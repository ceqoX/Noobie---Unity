const inlineReply = require("discord-reply");
const client = require("../index");
const config = require("../config.json"); // Retrieving Config
const token = config.token;
const prefix = config.prefix;
const Discord = require("discord.js");
const { Database } = require("quickmongo");
const mongoDBURL = require("../config.json").mongoDBURL;
const quickmongo = new Database(mongoDBURL);
// const {
badwords = require("../badwords.json");
const { author } = require("canvacord");
const Levels = require("discord-xp");
Levels.setURL(mongoDBURL);

// Message Event (For Commands)
client.on("message", async (message) => {
  if (!message.guild);
  if (message.author.bot) return;

  // Inline Reply
  if (message.mentions.has(client.user.id)) {
    const botMentionedEmbed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL()) // To Display the Message Author with #0001 .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`Prefix : \`${prefix}\`\nUse \`${prefix}help\``);

    return message.lineReply(botMentionedEmbed);
  }

  // Level System Message Event
  if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomAmountOfXp
    );
    let images = [
      "https://media.giphy.com/media/5eteu9kgqngeUK5lcE/giphy.gif",
      "https://media.giphy.com/media/CZNEEYucgxibKbv2tA/giphy.gif",
      "https://media.giphy.com/media/PBmgGirhjdmpY5yQOW/giphy.gif",
      "https://media.giphy.com/media/pfcI1gC62jDWaT8yCC/giphy.gif",
      "https://media.giphy.com/media/obOKwKvJKBWmwr9sqM/giphy.gif",
      "https://media.giphy.com/media/K8tCzkCnRH78iNIxHe/giphy.gif",
      "https://media.giphy.com/media/3i4aBWT15H6yoH5v4k/giphy.gif",
      "https://media.giphy.com/media/vVcaZTJUcBebqecsjh/giphy.gif",
      "https://media.giphy.com/media/htuy6zxMAhRELRzaWF/giphy.gif",
      "https://media.giphy.com/media/VgGcTrBJWRHc5Cut9v/giphy.gif",
      "https://media.giphy.com/media/t4wfNFXOArVeOwgSy7/giphy.gif",
      "https://media.giphy.com/media/KcKAiYMbLMdGS8KsB3/giphy.gif",
    ];
    let levelEmbedRotate = images[Math.floor(Math.random() * images.length)]; // Random Thumbnails for Level Up Embed*/

    if (hasLeveledUp) {
      let user = await Levels.fetch(message.author.id, message.guild.id);

      const levelupEmbed = new Discord.MessageEmbed()
        //With custom Level Embed Rotate!
        .setColor("YELLOW")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        )
        .setDescription(
          `Du bist jetzt **Level** **${user.level}**! Glückwunsch <a:PikachuDance:839278399548555294> <a:Cool:830824842282532865> 
                `
        )
        .setThumbnail(`${levelEmbedRotate}`);
      /* --> THATS THE DEFAULT LEVEL UP MESSAGE <--
            .setColor('RANDMON')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`You are now **Level** **${user.level}**! GG 🤩🥳 
            `)
            .setThumbnail('https://media.giphy.com/media/htuy6zxMAhRELRzaWF/giphy.gif'); */

      const levelsUpChannelCheck = await quickmongo.fetch(
        `levelsup-${message.guild.id}`
      );

      // Give Roles per Level
      if (user.level == 3) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  👶 〢 FRUIT [LvL 3+]"
        ); // Put here your Role Name
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 3",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  👶 〢 FRUIT [LvL 3+]"
        );
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 6) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  🦿 〢 ROUND-HOUSE [LvL 6+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»  👶 〢 FRUIT [LvL 3+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 6",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  🦿 〢 ROUND-HOUSE [LvL 6+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»  👶 〢 FRUIT [LvL 3+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 10) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  🧙 〢 DONT-TOUCH-ME [LvL 10+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»  🦿 〢 ROUND-HOUSE [LvL 6+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 10",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  🧙 〢 DONT-TOUCH-ME [LvL 10+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»  🦿 〢 ROUND-HOUSE [LvL 6+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 20) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  ☣️ 〢 DONT-DIE [LvL 20+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»  🧙 〢 DONT-TOUCH-ME [LvL 10+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 20",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  ☣️ 〢 DONT-DIE [LvL 20+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»  🧙 〢 DONT-TOUCH-ME [LvL 10+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 25) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  🧛 〢 JUICE [LvL 25+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»  ☣️ 〢 DONT-DIE [LvL 20+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 25",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  🧛 〢 JUICE [LvL 25+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»  ☣️ 〢 DONT-DIE [LvL 20+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 30) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»💥 〢 EPIC [LvL 30+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»  🧛 〢 JUICE [LvL 25+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 30",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»💥 〢 EPIC [LvL 30+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»  🧛 〢 JUICE [LvL 25+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 35) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  🔥 〢 XP - GLITCHER [LvL 35+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»💥 〢 EPIC [LvL 30+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 35",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  🔥 〢 XP - GLITCHER [LvL 35+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»💥 〢 EPIC [LvL 30+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 40) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  🌟 〢 STILL HERE [LvL 40+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»  🔥 〢 XP - GLITCHER [LvL 35+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 40",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  🌟 〢 STILL HERE [LvL 40+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»  🔥 〢 XP - GLITCHER [LvL 35+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 50) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  🌠 〢 IMMORTAL [LvL 50+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»  🌟 〢 STILL HERE [LvL 40+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 50",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  🌠 〢 IMMORTAL [LvL 50+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»  🌟 〢 STILL HERE [LvL 40+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (user.level == 60) {
        let role = message.guild.roles.cache.find(
          (role) => role.name == "»  🛸 〢 UNSTOPPABLE [LvL 60+]"
        );
        let hasrole = message.member.roles.cache.find(
          (role) => role.name == "»  🌠 〢 IMMORTAL [LvL 50+]"
        );
        if (!role)
          await message.guild.roles
            .create({
              data: {
                name: "Level 60",
                color: "GREY",
              },
            })
            .catch((err) => console.log(err));
        role = message.guild.roles.cache.find(
          (role) => role.name == "»  🛸 〢 UNSTOPPABLE [LvL 60+]"
        );
        hasrole = message.guild.roles.cache.find(
          (role) => role.name == "»  🌠 〢 IMMORTAL [LvL 50+]"
        );
        if (message.member.roles.cache.has(hasrole.id));
        await message.member.roles.remove(hasrole.id);
        if (message.member.roles.cache.has(role.id)) return;
        else await message.member.roles.add(role.id);
      }

      if (levelsUpChannelCheck) {
        const getlevelsUpChannel = await quickmongo.get(
          `levelsup-${message.guild.id}`
        );
        const levelsUpChannel =
          message.guild.channels.cache.get(getlevelsUpChannel);
        //let levelEmbedRotate = Math.floor(Math.random() * status.length);
        levelsUpChannel.send(levelupEmbed);
      } else {
        message.channel.send(levelupEmbed);
      }
      //message.channel.send(levelupEmbed); `${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`
    }
  }

  // Bad Words Message Event
  if ((await quickmongo.fetch(`swear-${message.guild.id}`)) === true) {
    for (let i = 0; i < badwords.length; i++) {
      if (message.content.toLowerCase().includes(badwords[i].toLowerCase())) {
        message.delete();

        message.channel
          .send("Please dont't swear in this server.")
          .then((msg) => {
            msg.delete({
              timeout: 15000,
            });
          });
      }
    }
  }

  // Check for AFK Message
  if (await quickmongo.fetch(`afk-${message.author.id}+${message.guild.id}`)) {
    const info = await quickmongo.get(
      `afk-${message.author.id}+${message.guild.id}`
    );
    const user = message.member;
    await quickmongo.delete(`afk-${message.author.id}+${message.guild.id}`);

    try {
      await user.setNickname(null);
    } catch {
      message.channel.send("Cannot reset nickname.");
    }

    message.reply(`Removed AFK Status, You were AFK with reason : ${info}`);
  }

  // Check for mentions
  const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    if (
      await quickmongo.fetch(
        `afk-${message.mentions.members.first().id}+${message.guild.id}`
      )
    ) {
      message.reply(
        `${mentionedMember.user.tag} is AFK with reason : ` +
          (await quickmongo.get(
            `afk-${message.mentions.members.first().id}+${message.guild.id}`
          ))
      );
    }
  }

  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // Permission Handler
  const PermissionsFlags = [
    "ADMINISTRATOR",
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  if (command.permissions.length) {
    let invalidPermissionsFlags = [];
    for (const permission of command.permissions) {
      if (!PermissionsFlags.includes(permission)) {
        return console.log(`Invalid Permissions : ${permission}`);
      }

      if (!message.member.hasPermission(permission)) {
        invalidPermissionsFlags.push(permission);
      }
    }

    if (invalidPermissionsFlags.length) {
      const noPermissionEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("INVALID PERMISSION")
        .setDescription("You don't have that permission !")
        .addField("Permission Required", `\`${invalidPermissionsFlags}\``)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

      return message.channel.send(noPermissionEmbed);
    }
  }

  if (command) command.run(client, message, args);
});

client.login(token);
