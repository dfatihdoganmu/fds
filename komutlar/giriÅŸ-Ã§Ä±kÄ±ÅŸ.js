const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  let channel = message.mentions.channels.first() || message.guild.channels.find(c=>c.name===args.slice(0).join(' '))
  
    if (!channel) {
        return message.reply("Giriş-çıkış kanalı olarak ayarlacağın kanalı etiketlemelisin!")
    }

    /*if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            gkanal: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/gc.json", JSON.stringify(kanal), (x) => {
        if (x) console.error(x)
      })*/
  
    var s = db.set(`gc_${message.guild.id}`, channel.id)
  
    const embed = new Discord.RichEmbed()
    .setAuthor("Giriş-çıkış kanalı başarıyla ayarlandı!")
    .setDescription(`${channel}`)
    .setColor("RANDOM")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hoş-geldin-ayarla', 'giriş-çıkış-belirle'],
    permLevel: 4,
    kategori: "ayarlar"
}

exports.help = {
    name: 'giriş-çıkış-ayarla',
    description: 'Giriş çıkış kanalını ayarlar.',
    usage: 'giriş-çıkış-ayarla [#kanal/kanal adı]'
}