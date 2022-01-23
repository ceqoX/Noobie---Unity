const Discord = require('discord.js');
const ms = require('ms');


module.exports = {
    name: 'remind',
    permissions: ['SEND_MESSAGES'],
    category: 'utility',
    usage: '<time> <reminder>',
    description: 'Remind a user',

    run: (client, message, args) => {
        let reminder = args.slice(1).join(' ');
        let time = args[0];

        const noDurationEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('ERROR')
            .setDescription('Please state a duration for reminder !')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp();

        if (!time) return message.channel.send(noDurationEmbed);

        const noReminderEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('ERROR')
            .setDescription('Please state reminder !')
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp();

        if (!reminder) return message.channel.send(noReminderEmbed);

        const reminderSetEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`Successfully set reminder !`)
            .addField('Remind In', `${time}`)
            .addField('Reminder', `${reminder}`)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp();

        message.channel.send(reminderSetEmbed);

        setTimeout(async function () {
            message.channel.send(`<@${message.author.id}>, here is your reminder !`);

            const reminderAlertEmbed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setAuthor('Reminder Alert !', message.author.displayAvatarURL({ dynamic: true }))
                .addField('Reminder', `${reminder}`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp();

            message.channel.send(reminderAlertEmbed);
        }, ms(time));
    },
};