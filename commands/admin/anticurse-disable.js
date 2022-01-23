const Discord = require("discord.js");
const { Database } = require("quickmongo");
const mongoDBURL = require("../../config.json").mongoDBURL;
const quickmongo = new Database(mongoDBURL);

module.exports = {
  name: "anticurse-disable",
  permissions: ["ADMINISTRATOR"],
  aliases: ["antiswear-disabled"],
  category: "admin",
  description: "Disable Anticurse feature",

  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You dont't have `ADMINISTRATOR` permission");
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "I dont't have `MANAGE_MESSAGES` permission."
      );

    if ((await quickmongo.fetch(`swear-${message.guild.id}`)) === true) {
      await quickmongo.delete(`swear-${message.guild.id}`);
      message.channel.send("Anticurse feature has been DISABLED !");
    } else
      return message.channel.send(
        "Anticurse feature has **ALREADY BEEN DISABLED** !"
      );
  },
};
