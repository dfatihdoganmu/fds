const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
const emoji1 = message.client.emojis.get('548943817068380173');  
  
	const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField("= Rahatsız Bot'un Davet Linkleri =", `${emoji1} [Botu Sunucuna Eklemek İçin Tıkla!](https://discordapp.com/oauth2/authorize?client_id=444200033781547028&scope=bot&permissions=2146958591) \n${emoji1} [Botun Destek Sunucusuna Gelmek İçin Tıkla](https://discord.gg/dxhYj3t) \n${emoji1} [Botun Web Sitesini Tıklayarak Ziyaret Et](http://rahatsizbot.ml) \n${emoji1} [Tıklayarak Bota DBL'de Oy Ver](https://discordbots.org/bot/444200033781547028/vote)\n${emoji1} [Web Paneli](https://rahatsizbot.glitch.me)`)
  .setThumbnail(client.user.avatarURL)
  message.channel.send(embed);
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['botu ekle', 'botu davet et', 'botuekle', 'invite'],
kategori: 'bot', 
permLevel: 0
};

exports.help = {
name: 'davet',
description: 'Botun davet linkini gönderir.',
usage: 'davet'
};