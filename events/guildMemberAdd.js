const client = require("../index");
const Discord = require("discord.js");
// Canvacord
const canvacord = require("canvacord");
// Quick Mongo
const { Database } = require("quickmongo");
const mongoDBURL = require("../config.json").mongoDBURL;
const quickmongo = new Database(mongoDBURL);

client.on("guildMemberAdd", async (member) => {
  const autoroleCheck = await quickmongo.fetch(`autorole-${member.guild.id}`);
  const getMemberRole = await quickmongo.get(`memberrole-${member.guild.id}`);
  const memberRole = member.guild.roles.cache.get(getMemberRole);
  const welcomeChannelCheck = await quickmongo.fetch(
    `welcome-${member.guild.id}`
  );
  let backgroundImage =
    "https://image.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg";
  const resized = await canvacord.Canvas.resize(backgroundImage, 700, 400);

  const welcomeChannel = member.guild.channels.cache.find(
    (channel) => channel.name === "willkommen"
  );
  let userinfoget =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.member(message.author);
  let memberCount = guild.members.filter((member) => !member.user.bot).size;

  let welcomeEmbed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setAuthor(`💓-lich Willkommen`, `${userinfoget.user.tag}`)
    .setDescription(
      "**Danke**, dass du uns **eine Chance** gibst. <a:PikachuDance:839278399548555294> \n ──────────────────────── \n <a:PetCeqoX:853354507470897192> Wir hoffen, du hast eine **schöne Zeit** bei uns. \n \n 》Hier siehst du ein paar **nützliche Text-Kanäle:** <a:news:846172176529096704> \n <a:Ring:830824840377401394> - `BESTE` Serverhilfe: <#830171020324634658> \n <a:info:848693198230650941> - Updates und `Infos`: <#830171756085248000> \n <a:Little_Kitty_Jelly_Blue:839279456329269259> - `Rollen` erhalten: <#846155797389508648> \n \n 》**Begrüße unsere Community** und sag Hallo! <a:PikachuHi:830907083770822666> \n <a:chat:850481468249342005> - Mit allen `Mitgliedern` chatten: <#830171020324634663> \n <a:AmongShy:830824841392554044> - Such dir `Mitspieler`: <#830171020719685652> \n \n **Account Infos** \n `<@${userinfoget.id}>` | Erstellt am: moment(userinfoget.user.createdAt) \n Du bist das `${memberCount}` Mitglied! \n ──────────────────────── "
    )
    .setTimestamp()
    .setFooter("© Neues Mitglied | ceqoX", client.user.displayAvatarURL());

  welcomeChannel.send(welcomeEmbed);
});
