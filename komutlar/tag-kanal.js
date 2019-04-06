const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
	
  let kanal = message.mentions.channels.first() || message.guild.channels.find(c=>c.name===args.slice(0).join(' '))
  if (!kanal) { 
    var embedd = new Discord.RichEmbed()
                .setDescription(`Lütfen sunucuya katılan kişilerin isimlerinin başına eklenecek tagı yazınız.`)
              .setColor("RANDOM")
            message.channel.send({embed: embedd})
    return
  }

  db.set(`tagKanal_${message.guild.id}`, kanal.id)
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor("Tag Kayıtları kanalı başarıyla ayarlandı!")
  .setDescription(`Tag Kayıtları kanalı ${kanal} olarak ayarlandı!`)
  message.channel.send({embed: embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['set-tag-channel', 'tag-kanal'],
  permLevel: 4,
  kategori: 'ayarlar'
}

exports.help = {
  name: 'tag-kanal-ayarla',
  description: 'Tag kayıtlarının gönderileceği kanalı ayarlar.',
  usage: "tag-kanal-ayarla [#kanal/kanal adı]"
}