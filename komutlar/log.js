const Discord = require('discord.js')
const fs = require('fs');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply("Sunucu kayıtları kanalı olarak ayarlamak istediğiniz kanalı etiketleyiniz!")
    }
  
    db.set(`log_${message.guild.id}`, channel.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Sunucu kayıtları kanalı başarıyla ${channel} olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['log-belirle'],
    permLevel: 4,
    kategori: "ayarlar"
}

exports.help = {
    name: 'log-ayarla',
    description: 'Sunucu kayıtları kanalını ayarlar.',
    usage: 'log-ayarla [#kanal]'
}