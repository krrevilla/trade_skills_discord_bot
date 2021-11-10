const fs = require('fs');
const { skills } = require('./constants');

function readSkill(args, message) {
    const skillToRead = args[1].toLowerCase();

    if (!skills.includes(skillToRead)) {
        message.reply('Trade skills does not exist.')

        return;
    }

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return null;
        }

        const jsonData = JSON.parse(data);
        const serverData = jsonData[message.guildId] ?? {};
        const skillsData = [];

        Object.keys(serverData).map((userId) => {
            if (serverData[userId] && serverData[userId][skillToRead]) {
                skillsData.push(`${serverData[userId].name}: ${serverData[userId][skillToRead]}`)
            }
        })

        if(skillsData.length) {
            message.reply(`
\`\`\`
${skillsData.join('\n')}
\`\`\`
            `)
        }
        else {
            message.reply(`No player has record on ${args[1]} yet`)
        }
    })
}

function updateSkill(args, message) {
    const skillToRead = args[1].toLowerCase();

    if (!skills.includes(skillToRead)) {
        message.reply('Trade skills does not exist.')

        return;
    }

    if (!args[2] || isNaN(args[2])) {
        message.reply('Invalid trade skill level.')

        return;
    }

    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return null;
        }

        let jsonData = JSON.parse(data);
        let serverData = jsonData[message.guildId] ?? {};

        jsonData = {
            ...jsonData,
            [message.guildId]: {
                ...serverData,
                [message.author.id]: {
                    ...serverData[message.author.id],
                    name: message.author.username,
                    [skillToRead]: args[2]
                }
            }

        }

        fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
                message.reply('Failed to update your trade skill.')
            }
            else {
                message.reply(`${args[1]} updated to ${args[2]}`)
            }
        });
    })
}

module.exports = {
    readSkill,
    updateSkill
}
