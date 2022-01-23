const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const { Database } = require("quickmongo");
const mongoDBURL = require("../../config.json").mongoDBURL;
const quickmongo = new Database(mongoDBURL);

module.exports = {
  name: "setup",
  permissions: ["ADMINISTRATOR"],
  category: "info",
  description: "Set up the Server",

  run: async (client, message, args) => {
    setTimeout(message.delete.bind(message), 1000);
    let choice = args[0];

    const noChoiceEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("❗️ NO CHOICE SELECTED")
      .setDescription("Please select wich section you want to setup.")
      .addField("Usage", `${prefix}setup <section-name> [value]`)
      .addField("\u200B", "__General__")
      .addField("👋 Welcome Channel", "Section Name : **welcomeChannel**", true)
      .addField("🚶 Goodby Channel", "Section Name : **goodbyChannel**", true)
      .addField("🎭 Autorole", "Section Name : **autoRole**", true)
      .addField("\u200B", "__Moderation__")
      .addField("🔨 Logs Channel", "Section Name : **logsChannel**", true)
      .addField("👤 Member Role", "Section Name : **memberRole**", true)
      .addField("🔇 Mute Role", "Section Name : **muteRole**", true)
      .addField("\u200B", "__Features__")
      .addField("🚀 Levels", "Section Name : **levels**", true)
      .addField("🚀 Levels Channel", "Section Name : **levelsup**", true)
      .addField(
        "🤬 Anticurse",
        "Section Name : **anticurse-enable/disable**",
        true
      )
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL());

    if (!choice) return message.channel.send(noChoiceEmbed);

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "You have to be an admin to access the command"
      );

    // Quick Mongo for Welcome Channel
    const getwelcomeChannel = await quickmongo.get(
      `welcome-${message.guild.id}`
    );
    const welcomeChannelCheck = await quickmongo.fetch(
      `welcome-${message.guild.id}`
    );
    let welcomeChannelStatus;

    if (welcomeChannelCheck) {
      welcomeChannelStatus = `<#${getwelcomeChannel}>`;
    } else welcomeChannelStatus = "`No Channel Set`";

    // Quick Mongo for leave Channel
    const getleaveChannel = await quickmongo.get(`leave-${message.guild.id}`);
    const leaveChannelCheck = await quickmongo.fetch(
      `leave-${message.guild.id}`
    );
    let leaveChannelStatus;

    if (leaveChannelCheck) {
      leaveChannelStatus = `<#${getleaveChannel}>`;
    } else leaveChannelStatus = "`No Channel Set`";

    // Quick Mongo for Member Role
    const getMemberRole = await quickmongo.get(
      `memberrole-${message.guild.id}`
    );
    const memberRoleCheck = await quickmongo.fetch(
      `memberrole-${message.guild.id}`
    );
    let memberRoleStatus;

    if (memberRoleCheck) {
      memberRoleStatus = `<@&${getMemberRole}>`;
    } else memberRoleStatus = "`No Role Set`";

    // Quick Mongo for Autorole
    const autoroleCheck = await quickmongo.fetch(
      `autorole-${message.guild.id}`
    );
    let autoRoleStatus;

    if (autoroleCheck) {
      autoRoleStatus = "🟤 (ON)";
    } else autoRoleStatus = "🟠 (OFF)";

    /* Quick Mongo for Anticurse */
    const anticurseCheck = await quickmongo.fetch(`swear-${message.guild.id}`);
    let anticurseStatus;

    // Check for Anticurse Status
    if (anticurseCheck === true) {
      anticurseStatus = "🟤 (ON)";
    } else anticurseStatus = "🟠 (OFF)";

    // Quick Mongo for Levels Feature
    const levelsCheck = await quickmongo.fetch(`levels-${message.guild.id}`);
    let levelStatus;

    // Check for Levels Status
    if (levelsCheck === true) {
      levelStatus = "🟤 (ON)";
    } else levelStatus = "🟠 (OFF)";

    // Quick Mongo for Levels Up Channel
    const getlevelsUpChannel = await quickmongo.get(
      `levelsup-${message.guild.id}`
    );
    const levelsUpChannelCheck = await quickmongo.fetch(
      `levelsup-${message.guild.id}`
    );
    let levelsUpChannelStatus;

    // Check for Levels up Feature
    if (levelsUpChannelCheck) {
      levelsUpChannelStatus = `<#${getlevelsUpChannel}>`;
    } else levelsUpChannelStatus = "`No Channel Set`";

    // Welcome Channel Set
    if (choice === "welcome") {
      const welcomeChannel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]);

      if (!welcomeChannel)
        return message.channel.send(
          "Please specify a valid channel to set up welcome channel !"
        );

      await quickmongo.set(`welcome-${message.guild.id}`, welcomeChannel.id);

      message.channel.send(`${welcomeChannel} is set as welcome channel !`);
    }

    // Leave Channel set
    if (choice === "leave") {
      const leaveChannel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]);

      if (!leaveChannel)
        return message.channel.send(
          "Please specify a valid channel to set up leave channel !"
        );

      await quickmongo.set(`leave-${message.guild.id}`, leaveChannel.id);

      message.channel.send(`${leaveChannel} is set as leave channel !`);
    }

    // Member Role set
    if (choice === "memberRole") {
      const memberRole =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);

      if (!memberRole)
        return message.channel.send(
          "Please specify a valid role to set up member role !"
        );

      await quickmongo.set(`memberrole-${message.guild.id}`, memberRole.id);

      message.channel.send(`${memberRole} is set as member role !`);
    }

    // Autorole set
    if (choice === "autorole") {
      const query = args[1];

      if (!query)
        return message.channel.send("Please choose from enable or disable");

      if (!memberRoleCheck)
        return message.channel.send("Please setup **Member Role** first !");

      if (query === "enable") {
        if ((await quickmongo.fetch(`autorole-${message.guild.id}`)) === null) {
          await quickmongo.set(`autorole-${message.guild.id}`, true);
          return message.channel.send("Autorole has been enabled");
        } else if (
          (await quickmongo.fetch(`autorole-${message.guild.id}`)) === false
        ) {
          await quickmongo.set(`autorole-${message.guild.id}`, true);
          return message.channel.send("Autorole has been enabled");
        } else return message.channel.send("Autorole already been **ENABLED**");
      }

      if (query === "disable") {
        if ((await quickmongo.fetch(`autorole-${message.guild.id}`)) === true) {
          await quickmongo.delete(`autorole-${message.guild.id}`);
          return message.channel.send("Autorole has been disabled");
        } else
          return message.channel.send("Autorole has already been **DISABLED**");
      }
    }

    // Levels Set
    if (choice === "levels") {
      let query = args[1];

      if (!query)
        return message.channel.send(
          "Please choose from **enable** or **disable**"
        );

      if (query === "enable") {
        if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === null) {
          await quickmongo.set(`levels-${message.guild.id}`, true);
          return message.channel.send("Levels has been enabled");
        } else if (
          (await quickmongo.fetch(`levels-${message.guild.id}`)) === false
        ) {
          await quickmongo.set(`levels-${message.guild.id}`, true);
          return message.channel.send("Levels has been enabled");
        } else {
          return message.channel.send("Levels has **ALREADY** been enabled !");
        }
      }

      if (query === "disable") {
        if ((await quickmongo.fetch(`levels-${message.guild.id}`)) === true) {
          await quickmongo.delete(`levels-${message.guild}`);
          return message.channel.send("Levels has been disabled.");
        } else {
          return message.channel.send("Levels has **ALREADY** been disabled !");
        }
      }
    }

    // Levelsup set
    if (choice === "levelsup") {
      const levelsUpChannel = message.mentions.channels.first();

      if (!levelsUpChannel) return message.channel.send("Not a valid channel");

      await quickmongo.set(`levelsup-${message.guild.id}`, levelsUpChannel.id);

      message.channel.send(`${levelsUpChannel} is set as levels up channel !`);
    }

    // Config Command
    if (choice === "config") {
      const configEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(`⚙️ ${message.guild.name}'s Server Configuration`)
        .addField("Usage", `${prefix}setup <section> [value]`)
        .addField("\u200B", "__General__")
        .addField("👋 Welcome Channel", `${welcomeChannelStatus}`, true)
        .addField("🚶 Goodby Channel", `${leaveChannelStatus}`, true)
        .addField("🎭 Autorole", `\`${autoRoleStatus}\``, true)
        .addField("\u200B", "__MODERATION__")
        .addField("🔨 Logs Channel", "`COMING SOON`", true)
        .addField("👤 Member Role", `${memberRoleStatus}`, true)
        .addField("🔇 Mute Role", "`COMING SOON`", true)
        .addField("\u200B", "__Features__")
        .addField("🤬 Anticurse", `\`${anticurseStatus}\``, true)
        .addField("🚀 Levels", `\`${levelStatus}\``, true)
        .addField("🚀 Levels Up", `${levelsUpChannelStatus}`, true)
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL());
      message.channel.send(configEmbed);
    }
    setTimeout(message.delete.bind(message), 1000);
  },
};
