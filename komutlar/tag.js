const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
	
  let tag = args.slice(0).join(' ');
  if (!tag) {
    var embedd = new Discord.RichEmbed()
                .setDescription(`Lütfen sunucuya katılan kişilerin isimlerinin başına eklenecek tagı yazınız.`)
              .setColor("RANDOM")
            message.channel.send({embed: embedd})
    return
  }

  db.set(`tag_${message.guild.id}`, tag)
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor("Tag başarıyla ayarlandı!")
  .setDescription(`Artık sunucuya katılanların isminin başına \`${tag}\` eklenecek.`)
  message.channel.send({embed: embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['set-tag', 'tag'],
  permLevel: 4,
  kategori: 'ayarlar'
}

exports.help = {
  name: 'tag-ayarla',
  description: 'Sunucuya birisi katıldığında katılan kişinin isminin başına gelecek tagı ayarlar.',
  usage: "tag-ayarla [tag]"
}