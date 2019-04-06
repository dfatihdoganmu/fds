const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args, dil, dill) => {
  
  let user = message.mentions.users.first() || message.author
  
  let rytCoin = db.fetch(`para_${user.id}`) || 0
  
  if (rytCoin < 1) return message.reply(dil.ekonomi.yok)
  
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${user.username} - ${dil.ekonomi.header}`, user.avatarURL)
  .addField(`${dil.ekonomi.para}:`, `${rytCoin} RH (Rht Coin)`)
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["para", "money", "balance"],
  permLevel: 0,
    kategori: "profil",
  category: 'profile'
};

exports.help = {
  name: "bakiye",
  description: "Bakiyenizi gösterir.",
  usage: "bakiye [<@kullanıcı>]"
};