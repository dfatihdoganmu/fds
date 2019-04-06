const Discord = require("discord.js");
const fs = require("fs");
exports.run = async (client, message, args, dil, dill) => {

  const db = require('quick.db');
  
  var cevap = args[0]
  
  let a = 'cinsiyetini'.toProperCase()
  if (dill === 'en') {
    a = 'gender'
  }
 
  if (!cevap) return message.reply(dil.profil.arg.replace("{x}", a))

  if (cevap !== "erkek" && cevap !== "male" && cevap !== "kız" && cevap !== "girl") return message.reply(dil.profil.arg.replace("{x}", a))
  
  if (cevap === "erkek" || cevap === "male") {
    
    db.set(`cinsiyet_${message.author.id}`, cevap.toProperCase())


    let sEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(dil.basarili)
    .setDescription(`**${cevap}**`);

    message.channel.send(sEmbed);
  }
  
  if (cevap === "kız" ||cevap === "girl") {
    
    db.set(`cinsiyet_${message.author.id}`, cevap.toProperCase())



    let sEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(dil.basarili)
    .setDescription(`**${cevap}**`);

    message.channel.send(sEmbed);
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cinsiyet", "gender", "set-gender"],
    permLevel: 0,
    kategori: "profil",
  };

  exports.help = {
    name: 'cinsiyet-ayarla',
    description: 'Profil bilginizdeki cinsiyeti ayarlar.',
    usage: 'cinsiyet-ayarla [cinsiyet]'
  };