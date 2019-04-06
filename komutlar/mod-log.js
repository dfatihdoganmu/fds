const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let kanal = JSON.parse(fs.readFileSync("././jsonlar/mLog.json", "utf8"));

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  
  let channel = message.mentions.channels.first() || message.guild.channels.find(c=>c.name===args.slice(0).join(' '))
  
    if (!channel) {
        return message.reply("Moderasyon Kayıtları Kanalı olarak ayarlamak istediğiniz kanalı etiketleyiniz!")
    }
  
  db.set(`mLog_${message.guild.id}`, channel.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Moderasyon Kayıtları kanalı başarıyla ${channel} olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log-belirle'],
    permLevel: 4,
    kategori: "moderasyon"
}

exports.help = {
    name: 'mod-log-ayarla',
    description: 'Moderasyon kayıtları kanalını ayarlar.',
    usage: 'mod-log-ayarla [#kanal/kanal adı]'
}