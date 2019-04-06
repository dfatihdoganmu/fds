const Discord = require('discord.js');
const useful = require('useful-tools');

exports.run = async (client, message, args) => {
  
  let x = message.channel.messages.get(args[0]);
  if (!x) return message.reply("Bulunduğunuz kanaldaki bir mesajın ID'ini yazınız!");
  
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor("Mesaj Bilgisi")
  .addField("Gönderen", x.author.tag)
  .addField("Mesaj", x.content || "Bilinmiyor")
  .addField("Gönderildiği Tarih", useful.tarih(x.createdAt))
  .addField("Mesaj Linki", `https://discordapp.com/channels/${x.guild.id}/${x.channel.id}/${x.id}`)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mesaj-ara', 'mesajara', 'alıntı'],
  permLevel: 0,
  kategori: "arama"
};

exports.help = {
  name: 'mesaj',
  description: 'IDini verdiğiniz mesaj hakkında bilgi verir. (IDi verilen mesaj komutun kullanıldığı kanalda yok ise mesajı bulamaz.)',
  usage: 'mesaj [mesaj ID]'
};