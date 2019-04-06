const Discord = require('discord.js')
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, dil, dill) => {
  
  const db = require('quick.db');
  
  let ayar = "Destek Sistemi Mesajı"
  if (dill === 'en') {
    ayar = "Support System Message"
  }
  
  let mesaj = args.slice(0).join(' ');
  
    if (!mesaj) {
      let e = new Discord.RichEmbed()
      .setDescription(dil.ayarlar.arg.msg.replace("{ayar}", ayar))
      .setColor("RANDOM")
      message.channel.send(e)
      return;
    }
  
    var s = db.set(`destekM_${message.guild.id}`, mesaj)
  
    const embed = new Discord.RichEmbed()
    .setAuthor(dil.basarili)
    .setDescription("```\n"+s+"\n```")
    .setColor("RANDOM")
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["destek-mesaj", "support-message", "set-support-message", "support-msg", "set-support-msg"],
    permLevel: 4,
    kategori: "ayarlar"
  };

  exports.help = {
    name: 'destek-mesaj-ayarla',
    description: 'Gelişmiş Destek Sistemindeki destek mesajını değiştirmenizi sağlar.',
    usage: 'destek-mesaj-ayarla [mesaj]'
  };