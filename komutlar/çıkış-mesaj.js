const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let cMesaj = JSON.parse(fs.readFileSync("././jsonlar/cikisM.json", "utf8"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let cM = args.slice(0).join(' ');
  
    if (!cM) {
        return message.reply("Çıkış mesajı ayarlamak istediğiniz mesajı yazmalısınız! \n**NOT:** Mesajda kişinin geleceği yere **{kullanıcı}**, sunucu isminin geleceği yere **{sunucu}** veya sunucudaki kişi sayısının geleceği yere **{kişisayısı}** yazınız.")
    }

    /*if(!cMesaj[message.guild.id]){
        cMesaj[message.guild.id] = {
            cm: cM
        };
    }
    fs.writeFile("././jsonlar/cikisM.json", JSON.stringify(cMesaj), (x) => {
        if (x) console.error(x)
      })*/
  
    db.set(`cikisM_${message.guild.id}`, cM)
  
    const embed = new Discord.RichEmbed()
    .setTitle(`Çıkış Mesajı başarıyla ayarlandı!`)
    .addField(`Ayarlanan Mesaj`, "```" + cM + "```")
    .setColor("RANDOM")
    message.channel.send({embed})

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4,
    kategori: "ayarlar"
  };

  exports.help = {
    name: 'çıkış-mesaj-ayarla',
    category: 'ayarlar',
    description: 'Çıkış mesajını değiştirmenizi sağlar.',
    usage: 'çıkış-mesaj-ayarla [mesaj]'
  };
  