const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, dil, dill) => {
  
  const db = require('quick.db');
  
  let y = args[0]
  let x = args.slice(1).join(' ');
  let ss = ['giriş', 'çıkış']
  
  if (!y) {
    return message.reply("Lütfen ayarlamak istediğiniz mesajı yazınız! \nGirşi mesajı için `giriş`, çıkış mesajı için ise `çıkış` yazınız.")
  }
  if (!ss.includes(y)) {
    return message.reply("Lütfen ayarlamak istediğiniz mesajı yazınız! \nGirşi mesajı için `giriş`, çıkış mesajı için ise `çıkış` yazınız.")
  }
  
  if (y === 'giriş') {
  
    if (!x) {
        return message.reply("Sayaç giriş mesajı ayarlamak istediğiniz mesajı yazmalısınız! \n**NOT:** Mesajda kişinin geleceği yere **{kullanıcı}**, hedefin geleceği yere **{hedef}**, hedefe kaç kişi kaldığının geleceği yere **{üye}** yazınız.")
    }
  
    var s = db.set(`sayacGM_${message.guild.id}`, x)
  
    
    const embed = new Discord.RichEmbed()
    .setAuthor("Sayaç giriş mesajı başarıyla ayarlandı!")
    .setDescription("```" + s + "```")
    .setColor("RANDOM")
    message.channel.send({embed})
    
  }

  if (y === 'çıkış') {
  
    if (!x) {
        return message.reply("Sayaç çıkış mesajı ayarlamak istediğiniz mesajı yazmalısınız! \n**NOT:** Mesajda kişinin geleceği yere **{kullanıcı}**, hedefin geleceği yere **{hedef}**, hedefe kaç kişi kaldığının geleceği yere **{üye}** yazınız.")
    }
  
    var s = db.set(`sayacCM_${message.guild.id}`, x)
  
    
    const embed = new Discord.RichEmbed()
    .setAuthor("Sayaç çıkış mesajı başarıyla ayarlandı!")
    .setDescription("```" + s + "```")
    .setColor("RANDOM")
    message.channel.send({embed})
    
  }
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sayaç-mesaj", "sayaç-mesaj-belirle"],
    permLevel: 4,
    kategori: "ayarlar"
  };

  exports.help = {
    name: 'sayaç-mesaj-ayarla',
    description: 'Sayaç giriş ve çıkış mesajınlarını değiştirmenizi sağlar.',
    usage: 'sayaç-mesaj-ayarla [mesaj]'
  };