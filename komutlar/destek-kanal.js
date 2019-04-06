const Discord = require('discord.js')
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, dil, dill) => {
  
  const db = require('quick.db');
  
  let ayar = "Destek Sistemi Kanalı"
  if (dill === 'en') {
    ayar = "Support System Channel"
  }
  
  let kanal = message.mentions.channels.first() || message.guild.channels.find(c=>c.name===args.slice(0).join(' '));
  
    if (!kanal) {
      let e = new Discord.RichEmbed()
      .setDescription(dil.ayarlar.arg.kanal.replace("{ayar}", ayar))
      .setColor("RANDOM")
      message.channel.send(e)
      return;
    }
  
    var s = db.set(`destekK_${message.guild.id}`, kanal.id)
  
    const embed = new Discord.RichEmbed()
    .setAuthor(dil.basarili)
    .setDescription("<#"+s+">")
    .setColor("RANDOM")
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["destek-kanal", "support-channel", "set-support-channel"],
    permLevel: 4,
    kategori: "ayarlar"
  };

  exports.help = {
    name: 'destek-kanal-ayarla',
    description: 'Gelişmiş Destek Sistemindeki destek kanalını değiştirmenizi sağlar.',
    usage: 'destek-kanal-ayarla [#kanal/kanal adı]'
  };