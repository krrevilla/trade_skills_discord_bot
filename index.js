require('dotenv').config();

const { Client, Intents } = require('discord.js');
const { readSkill, updateSkill } = require('./helpers');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = '!';

client.on('message', message => {
    const commandBody = message.content.slice(prefix.length).trim();
    const args = commandBody.split(' ');

    if (message.author.bot || !message.content.startsWith(prefix) || commandBody === '') return;

    switch (args[0].toLowerCase()) {
        case 'view':
            readSkill(args, message);
            break;

        case 'update':
            updateSkill(args, message);
            break;
    }
})

client.login(process.env.DISCORD_TOKEN)
