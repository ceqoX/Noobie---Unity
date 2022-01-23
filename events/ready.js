const client = require("../index");
const config = require("../config.json");
const prefix = config.prefix;

// Ready Event
client.on("ready", async () => {
  // Auto Change Status

  async function statusChanging() {
    let guild = await client.guilds.fetch("830171019841896569");
    let members = (await guild.members.fetch()).filter((m) => !m.user.bot);
    let membersAmount = members.size;

    let status = [`mit ${membersAmount} User`, `${prefix}help für Hilfe`];

    let statusRotate = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[statusRotate], {
      type: "PLAYING",
    });
    console.log(
      `Logged in as ${client.user.tag} ${
        client.users.cache.filter((u) => !u.bot).size
      } Member auf ceqoX`
    );
  }

  //Someone may have a better way of doing this, but basically this should basically run the function 5 seconds after it finishes (so if it takes 6 seconds to execute, it won't be started in the meantime, but it will be restarted 5 seconds after it finishes executing
  client.user.setStatus("dnd");

  setInterval(statusChanging, 5000);

  //console.log(`Logged in as ${client.user.tag} ${client.users.cache.filter(u => !u.bot).size} Member auf ceqoX`);
});
