const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  let isim = args.slice(0).join(' ');
  if (!isim) return message.channel.send('Lütfen Bir Twitch Kanalı İsmi Yaz.')
  message.channel.send('Canlı yayına girdiği zaman bildirilicek kanal ``'+ isim +'`` olarak ayarlandı!')
  db.set(`twcanlı_${message.guild.id}`, isim)
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['tw-ayarla'],
 permLevel: 4,
   kategori: "ayarlar"
};
exports.help = {
 name: 'twitch-ayarla',
 description: 'Twitch Kanalını Ayarlamayı Sağlae',
 usage: 'twitch-ayarla <kanal>'
};