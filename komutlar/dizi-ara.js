const Discord = require('discord.js')
const request = require('request')
const croxy = require("croxy-api")
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const prefix = db.fetch(`${message.guild.id}.prefix`) || client.ayarlar.prefix
  const dizi = args.join(" ").slice(0)
  const dizii = await croxy.dizi(dizi)
  const isim = dizii.isim
  const açıklama = dizii.açıklama
  const kategori = dizii.kategoriler
  const süre = dizii.süre
    if(isim === undefined) return message.channel.send(`${client.hayir} Lütfen geçerli bir dizi ismi giriniz.`)
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`${isim} | Bilgi`)
  .setDescription(açıklama)
  .addField("Süre", süre, true)
  .addField("Kategori(ler)", kategori, true)
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dizi'],
  permLevel: 0,
    kategori: "arama"
};

exports.help = {
  name: 'dizi-ara',
  description: 'Dizi Arar.',
  usage: ''
};