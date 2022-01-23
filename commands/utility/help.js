const Discord = require('discord.js');
const fs = require('fs');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'help',
    permissions: ['SEND_MESSAGES'],
    aliases: ['h'],
    description: 'Show Help Menu',
    
    run: async (client, message, args) => {
        setTimeout(message.delete.bind(message), 1000)
        if (!args[0]) {
            let categories = [];

            fs.readdirSync('./commands/').forEach(dir => {
                const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

                const cmds = commands.map(command => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return 'No Command name';

                    let name = file.name.replace('.js', '');

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? 'In progress' : cmds.join(' '),
                };

                categories.push(data);
            });

            const helpEmbed = new Discord.MessageEmbed()
                .setTitle('Help Menu')
                .addFields(categories)
                .setDescription(`Use \`${prefix}help\` with a command name to get command information`)
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL());

            return message.channel.send(helpEmbed);
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases.includes(args[0].toLowerCase()));

            if (!command) {
                const noCommandEmbed = new Discord.MessageEmbed()
                    .setTitle(`Command not found`)
                    .setDescription(`Command not found ! Use \`${prefix}help\` to list all commands`)
                    .setColor('RED')
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                    .setTimestamp();

                return message.channel.send(noCommandEmbed);
            }

            const helpMenuEmbed = new Discord.MessageEmbed()
                .setTitle('Command Information')
                .addField('Prefix', `\`${prefix}\``)
                .addField('Command', command.name ? `\`${command.name}\`` : 'No command name')
                .addField('Aliases', command.aliases ? `\`${command.aliases.join('` `')}\`` : 'No Aliases')
                .addField('Usage', command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``)
                .addField('Description', command.description ? command.description : 'No description.')
                .setColor('YELLOW')
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL());

            return message.channel.send(helpMenuEmbed);
        }
    },
};