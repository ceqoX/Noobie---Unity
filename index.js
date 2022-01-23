const Discord = require("discord.js"); //Retrieve discord.js module
const client = new Discord.Client(); // Define Discord.Clint() as Client
const fs = require("fs"); // Retrieving fs module
const mongoose = require("mongoose");
const mongoDBURL = ""; // PUT HERE YOUR MONGODB URL

mongoose
  .connect(mongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("Connected to MongoDB Database"));

client.commands = new Discord.Collection(); // Commands Collection
client.aliases = new Discord.Collection(); // Aliases Collection
client.categories = fs.readdirSync("./commands/");
module.exports = client;
["handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
