const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, dil, dill) => {
  
  let x = "Giriş Mesajı"
  if (dill === 'en') {
    x = "Input Message"
  }
  
  const db = require('quick.db');
  
  let gM = args.slice(0).join(' ');
  
    if (!gM) {
        return message.reply("Giriş mesajı ayarlamak istediğiniz mesajı yazmalısınız! \n**NOT:** Mesajda kişinin geleceği yere **{kullanıcı}**, sunucu isminin geleceği yere **{sunucu}** veya sunucudaki kişi sayısının geleceği yere **{kişisayısı}** yazınız.")
    }
  
    var s = db.set(`girisM_${message.guild.id}`, gM)
  
    const embed = new Discord.RichEmbed()
    .setAuthor("Giriş mesajı başarıyla ayarlandı!")
    .setDescription("```" + s + "```")
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
    name: 'giriş-mesaj-ayarla',
    description: 'Giriş mesajını değiştirmenizi sağlar.',
    usage: 'giriş-mesaj-ayarla [mesaj]'
  };