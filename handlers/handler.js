const fs = require('fs')
const ascii = require('ascii-table');
let table = new ascii("Commands List");
table.setHeading('Commands', 'Commands Status');

module.exports = client => {
    // Start of Commands Handler
    fs.readdirSync('./commands/').forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}`).filter(files => files.endsWith('.js'));

        for (let files of commands){
            let get = require(`../commands/${dir}/${files}`);

            if(get.name){
                client.commands.set(get.name, get);
                table.addRow(files, 'Success');
            }else{
                table.addRow(files, 'Failed');
                continue;
            }
            if(get.aliases && Array.isArray(get.aliases)) get.aliases.forEach(alias => client.aliases.set(alias, get.name))
        }
    })
    console.log(table.toString());
    // End of Commands Handler

    // Start of Events Handler
    fs.readdirSync('./events/').forEach(file => {
        const events = fs.readdirSync('./events/').filter((files) => files.endsWith('.js'));

        for(let files of events){
            let get = require(`../events/${files}`)

            if(get.name){
                client.events.set(get.name, get)
            }else{
                continue;
            }
        }
    });

    // End of Events Handler
};