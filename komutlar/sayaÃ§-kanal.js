const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let kanal = JSON.parse(fs.readFileSync("././jsonlar/sKanal.json", "utf8"));

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db')
  
  let channel = message.mentions.channels.first() || message.guild.channels.find(c=>c.name===args.slice(0).join(' '))
  
    if (!channel) {
        return message.reply("Lütfen sayaç kanalı olarak ayarlamak istediğiniz kanalı etiketleyiniz.")
    }

    /*if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            sayacKanal: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/sKanal.json", JSON.stringify(kanal), (x) => {
        if (x) console.error(x)
      })*/
  
    db.set(`sKanal_${message.guild.id}`, channel.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Sayaç kanalı başarıyla ${channel} olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayaç-kanal-belirle','sayaç-kanal','sayaçkanal'],
    permLevel: 4,
    kategori: "ayarlar"
}

exports.help = {
    name: 'sayaç-kanal-ayarla',
    description: 'Sayaç kanalını ayarlar.',
    usage: 'sayaç-kanal-ayarla [#kanal/kanal adı]'
}