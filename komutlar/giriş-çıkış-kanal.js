const Discord = require('discord.js')
 
exports.run = async (client, message, args) => {
  
  const db = require('quick.db');

  const prefix = db.fetch(`${message.guild.id}.prefix`) || client.ayarlar.prefix
  
  let kanal = message.mentions.channels.first() || message.guild.channels.find(s => s.name===args.slice(0).join(" "))
  
    if (!kanal) {
        return message.channel.send(`${client.usage} **${prefix}${exports.help.usage}**`)
    }
    if(db.has(`${message.guild.id}.girişçıkışKanalı`)) {
        if(kanal.id === db.fetch(`${message.guild.id}.girişçıkışKanalı`))
        return message.channel.send(`Resimli giriş çıkış kanalı zaten <#${kanal.id}> olarak ayarlı?`)
    }
  
    db.set(`${message.guild.id}.girişçıkışKanalı`, kanal.id)
  
    message.channel.send(`$ Resimli giriş çıkış kanalı <#${kanal.id}> olarak ayarlanmıştır.`)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gçkanal"],
  permLevel: 0,
  kategori: ''
};

exports.help = {
  name: 'giriş-çkış-kanal',
  description: '',
  usage: 'giriş-çkış-kanal'
};