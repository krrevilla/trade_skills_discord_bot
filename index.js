require('dotenv').config();

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
    console.log({ msg });

    if (msg.content === "ping") {
        msg.reply("pong");
    }
})

client.login(process.env.DISCORD_TOKEN)
