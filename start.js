const request = require('request');
const fs = require('fs');
const moment = require('moment');
const Discord = require('discord.js');

function log(msg) {
  console.log(`${moment().format("YYYY-MM-DD HH:mm:ss")} ➾ ${msg}`);
  fs.appendFileSync("./log.txt", `${moment().format("YYYY-MM-DD HH:mm:ss")} ➾ ${msg} \n`);
}

log('Program başladı.')
log('Yapımcı: Can')
log('GitHub: https://github.com/fastuptime')

const tokens = fs.readFileSync('tokens.txt', 'utf8').split('\n');
for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    function allowUserBotting(client) {
        client.rest.getAuth = function () {
            const token = this.client.token || this.client.accessToken;
            if (token) return `${token}`;
            throw new Error('TOKEN_MISSING');
        }
    }
    const client = new Discord.Client();
    allowUserBotting(client);
    
    client.on('ready', () => {
        log(`${client.user.tag} giriş yaptı.`);
    });

    client.login(token).catch(err => {
        log(token + ' tokeni geçersiz. Error: ' + err);
    });
}