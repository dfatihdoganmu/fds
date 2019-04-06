const Discord = require('discord.js')
const request = require('request')
const croxy = require("croxy-api")
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const prefix = db.fetch(`${message.guild.id}.prefix`) || client.ayarlar.prefix
 const kekoca = args.join(" ").slice(0)
  const kekocaa= await croxy.kekoca(kekoca)
 
    
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`Rahatsız Bot | Kekoca`)
  .setDescription(kekocaa)
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['keko'],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'kekoca',
  description: 'Yazıyı rastgele büyütür küçültür (nam-ı diğer kekoca).',
  usage: ''
};