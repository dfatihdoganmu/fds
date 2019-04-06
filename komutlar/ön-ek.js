const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
  //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let arg = args.slice(0).join(' ');
  if(!arg) return message.channel.send("Lütfen ayarlamak istediğiniz ön-eki yazınız! \n(`varsayılan` yazarsanız botun orjinal ön ekini ayarlayacaktır.)")

  if (arg === client.ayarlar.prefix) return message.reply("Botun orjinal ön ekini özel ön ek olarak ayarlayamazsın! \nEğer ön ekin botun normal ön eki olmasını istiyorsan `r?` yerine `varsayılan` yazarak ön-ek komutunu kullan!")
  
  if (arg === "varsayılan" || arg === "sıfırla" || arg === "reset" || arg === "default") {
    
    db.delete(`prefix_${message.guild.id}`)
    
    var embed2 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Ön-Ek Başarıyla Sıfırlandı!")
    .setDescription("Ön-Ek sıfırlanıp `"+client.ayarlar.prefix+"` olarak ayarlanmıştır!")
    message.channel.send(embed2)
    return;
  }
  
  var i = db.set(`prefix_${message.guild.id}`, arg)
    
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Ön-Ek Başarıyla Değiştirildi!")
    .addField("Ayarlanan Ön-Ek", `\`${i}\``)
    message.channel.send(embed)
    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["önek", "prefix", "ön-ek-belirle", "ön-ek-ayarla", "önek-ayarla", "önek-belirle", "prefix-ayarla", "prefix-belirle"],
  permLevel: 4,
  kategori: "ayarlar"
};

exports.help = {
  name: 'ön-ek',
  category: 'ayarlar',
  description: 'Botun ön ekini sunucuya özel olarak değiştirir.',
  usage: 'ön-ek [ön ek]'
};