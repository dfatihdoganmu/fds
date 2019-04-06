const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const hastebin = require('hastebin-gen');

exports.run = async (client, message, args) => {

  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('Uyarısına bakacağın kişiyi etiketlemelisin!');

  let komutlar = JSON.parse(fs.readFileSync("./uyarılar.json", "utf8"));
  
  if (!komutlar[message.guild.id+"-"+user.id]) return message.reply("Bu kullanıcının hiç uyarısı bulunmuyor!")

  const embed = new Discord.RichEmbed()

  var array = komutlar[message.guild.id+"-"+user.id]
  
  for (var i = 0; i < komutlar[message.guild.id+"-"+user.id].length; i++) {
    var a = array[i]
  }
  
  var r = await hastebin(array.map(u => `|--------Uyarı-------| \n- Kodu: ${Object.keys(u)} \n- Sebebi: ${u[Object.keys(u)]} \n|--------------------|`).join('\n\n'), 'diff').catch(err => message.channel.send("Şuanda https://hastebin.com/about.md adresinde sorun bulunduğu için bu komut kullanılamıyor. Site düzeldiğinde komut çalışacaktır."))

  
    
  embed.setColor("RANDOM")
  embed.setAuthor(`${user.username} - Uyarı Bilgisi`, user.avatarURL)
  embed.addField("Toplam Uyarı Sayısı", komutlar[message.guild.id+"-"+user.id].length || 0)
  embed.addField("Uyarılar", r)
  embed.setFooter(`${client.user.username} - Uyarı Sistemi`, client.user.avatarURL)
  message.channel.send({embed: embed})
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warns"],
  permLevel: 1,
    kategori: "moderasyon"
};

exports.help = {
  name: 'uyarılar',
  category: 'moderasyon',
  description: 'İstediğiniz kişinin uyarılarını gösterir.',
  usage: 'uyarılar [@kullanıcı]'
};