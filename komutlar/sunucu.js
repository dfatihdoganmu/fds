const Discord = require('discord.js');
//const ayarlar = require('../ayarlar.json');
const moment = require('moment');
require('moment-duration-format');
var db = require('quick.db');
const useful = require('useful-tools');

exports.run = async (client, message, params) => {
  
  var konumlar = {
    "russia": "Rusya",
    "us-west": "Batı Amerika",
    "us-south": "Güney Amerika",
    "us-east": "Doğu Amerika",
    "us-central": "Amerika",
    "brazil": "Brezilya",
    "singapore": "Singapur",
    "sydney": "Sidney",
    "eu-west": "Batı Avrupa",
    "eu-south": "Güney Avrupa",
    "eu-east": "Doğu Avrupa",
    "eu-central": "Avrupa",
    "hongkong": "Hong Kong",
    "japan": "Japonya"
  };
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || `Değiştirilmemiş (${client.ayarlar.prefix})`;
  /*if(db.has(`komutkomuts_${message.guild.id}`)) {
for(var i = 0; i < db.fetch(`komutkomuts_${message.guild.id}`);) {
  
 var k = db.fetch(`komutkomut_${message.guild.id}_${i}`)
}
  }*/
  
   const embed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .setThumbnail(message.guild.iconURL)
   .setAuthor(`${message.guild.name} - Sunucu Bilgisi`, message.guild.iconURL)
   .addField("Sunucu Adı", message.guild.name)
   .addField("ID", message.guild.id)
   .addField("Bölgesi", konumlar[message.guild.region])
   .addField("Sunucu Sahibi", message.guild.owner.user.tag)
   .addField("Üyeler"+' ['+message.guild.memberCount+']', `Çevrimiçi: ${message.guild.members.filter(m => m.user.presence.status === "online").size} \nRahatsız etmeyin: ${message.guild.members.filter(m => m.user.presence.status === "dnd").size} \nBoşta: ${message.guild.members.filter(m => m.user.presence.status === "idle").size} \nÇevrimdışı: ${message.guild.members.filter(m => m.user.presence.status === "offline").size} \nBot: ${message.guild.members.filter(m => m.user.bot).size}`)
   .addField("Kanallar"+' ['+message.guild.channels.size+']', `Yazı kanalı: ${message.guild.channels.filter(c => c.type === "text").size} \nSesli kanal: ${message.guild.channels.filter(c => c.type === "voice").size} \nKategori: ${message.guild.channels.filter(c => c.type === "category").size} \nAFK Kanalı: ${message.guild.afkChannel ? message.guild.afkChannel : 'Bulunmuyor'}`)
   .addField("Roller"+' ['+message.guild.roles.size+']', `\`${client.ayarlar.prefix}roller\` yazarak görebilirsiniz.`)
   .addField("Emojiler"+' ['+message.guild.emojis.size+']', `\`${client.ayarlar.prefix}emojiler\` yazarak görebilirsiniz.`)
   .addField("Oluşturulma Tarihi", `${useful.tarih(message.guild.createdAt)}`)
   .addField("Sunucudaki Ön-ek/Prefix", "`"+prefix+"`")
  // .addField(dil.sunucu.komut, "`"+k || "Bulunmuyor"+"`", true)
   //.addField(dil.sunucu.premium, db.has(`premiumm_${message.guild.id}`) ? db.fetch(`premiumm_${message.guild.id}`).replace("aktif", x) : y)
   message.channel.send({embed});
 };

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ["sunucu", "server", "sb", "sunucubilgi"],
   permLevel: 0,
    kategori: "sunucu",
   category: "server"
 };

 exports.help = {
   name: 'sunucu-bilgi',
   description: 'Bulunduğunuz sunucu hakkında bilgi verir.',
   usage: ''
 };