const Discord = require("discord.js");
var Jimp = require('jimp');

exports.run = async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    if (!message.guild) user = message.author;
   
    message.channel.send(`:timer: | Fotoğraf işleniyor, lütfen bekleyin.`).then(m => m.delete(1000));

Jimp.read(user.avatarURL, (err, image) => {
    image.resize(315, 310)
    Jimp.read("https://api.eggsybot.xyz/api/cerceve?cerceve=partner&url=https://api.eggsybot.xyz/pub/resources/frames/partner.png", (err, avatar) => {
        avatar.resize(315, 320)
        image.composite(avatar, 0, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
        }, 1000);
    });

});
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
  kategori: 'efekt'
  };
  
  exports.help = {
    name: 'dcpartner',
    description: 'Discord Partner Çerçeve',
    usage: ''
  };