const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let rol = JSON.parse(fs.readFileSync("././jsonlar/otoR.json", "utf8"));

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  let channel = message.mentions.channels.first() || message.guild.channels.find(c=>c.name===args.slice(0).join(' '))
  
    if (!channel) {
        return message.reply("Otomatik rol kayıtları kanalı olarak ayarlamak istediğiniz kanalı etiketleyiniz!")
    }
  
     db.set(`otoRolK_${message.guild.id}`, channel.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Otomatik rol kayıtları kanalı başarıyla ${channel} olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['oto-rol-kanal-ayarla', 'oto-rol-kanal-belirle','otorolkanal',],
    permLevel: 4,
    kategori: "ayarlar"
}

exports.help = {
    name: 'oto-rol-kanal',
    description: 'Otomatik rol kayıtlarının gönderileceği kanalı ayarlar.',
    usage: 'oto-rol-kanal [#kanal/kanal adı]'
}