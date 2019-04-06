const Discord = require('discord.js')
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, dil, dill) => {
  
  const db = require('quick.db');
  
  let ayar = "Destek Sistemi Rolü"
  if (dill === 'en') {
    ayar = "Support System Role"
  }
  
  let rol = message.mentions.roles.first() || message.guild.roles.find(r=>r.name===args.slice(0).join(' '));
  
    if (!rol) {
      let e = new Discord.RichEmbed()
      .setDescription(dil.ayarlar.arg.rol.replace("{ayar}", ayar))
      .setColor("RANDOM")
      message.channel.send(e)
      return;
    }
  
    var s = db.set(`destekR_${message.guild.id}`, rol.id)
  
    const embed = new Discord.RichEmbed()
    .setAuthor(dil.basarili)
    .setDescription("`@"+rol.name+"`")
    .setColor("RANDOM")
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["destek-rol", "support-role", "set-support-role"],
    permLevel: 4,
    kategori: "ayarlar"
  };

  exports.help = {
    name: 'destek-rol-ayarla',
    description: 'Gelişmiş Destek Sistemindeki destek ekibi rolünü değiştirmenizi sağlar.',
    usage: 'destek-rol-ayarla [@rol/rol adı]'
  };