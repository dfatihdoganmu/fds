const Discord = require('discord.js')
const croxy = require('croxy-api')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const prefix = db.fetch(`${message.guild.id}.prefix`) || client.ayarlar.prefix
  let arg = args.join(" ")
  if(!arg) return message.channel.send(client.usage+" **"+prefix+exports.help.usage+"**")
  const sarki = await croxy.şarkı(arg)
  if(!sarki) return message.channel.send(`Lütfen https://genius.com adresinde bulunan bir müziği girin.`)
  message.channel.send(`
${sarki || "Lütfen https://genius.com adresinde bulunan bir müziği girin."}`, {code:"asciidoc", split:true})
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0,
    kategori: "arama"
};

exports.help = {
  name: "sözler",
  description: "İstediğiniz Şarkının Sözlerini Aratırsınız.",
  usage: "sözler "
};