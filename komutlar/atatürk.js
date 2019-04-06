const Discord = require("discord.js");
var Jimp = require('jimp');

exports.run = async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    if (!message.guild) user = message.author;
   
    message.channel.send(`:timer: | Fotoğraf hazırlanıyor, lütfen bekleyin.`).then(m => m.delete(1000));

Jimp.read(user.avatarURL, (err, image) => {
    image.resize(318, 320)
    Jimp.read("https://api.eggsybot.xyz/api/cerceve?cerceve=ataturk&url=https://api.eggsybot.xyz/pub/resources/frames/ataturk.png", (err, avatar) => {
        avatar.resize(318, 320)
        image.composite(avatar, 1, 0).write(`./img/ataç/${client.user.id}-${user.id}.png`);
        setTimeout(function() {
            message.channel.send(new Discord.Attachment(`./img/ataç/${client.user.id}-${user.id}.png`));
        }, 1000);
    });

});
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["atatürk","atatürkçerçeve"],
    permLevel: 0,
    kategori: 'efekt'  
  };
  
  exports.help = {
    name: 'atatürk-çerçeve',
    description: 'Profilinize Atatürk Efekti Ekler',
    usage: 'atatürk-çerçeve'
  };