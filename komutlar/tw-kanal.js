const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

  let channel = message.mentions.channels.first()

    if (!channel) {
        return message.channel.send(`Twitch Kanal olarak ayarlamak istediğin kanalı etiketlemelisin.`)
    }

  db.set(`twkanal_${message.guild.id}`, channel.id)
    const embed = new Discord.RichEmbed()
    .setColor("0x36393e")
    .setAuthor("Twitch Kanalı Başarıyla Ayarlandı")
    .addField("Ayarlanan Kanal", `**${channel}**`)
    .addField("Ayarlayan", message.author)
     message.channel.send(embed)
    };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['tw-kanal-ayarla', 'tw-kanal',],
    permLevel: 4,
  kategori: "ayarlar"
}

exports.help = {
    name: 'twitch-kanal-ayarla',
    description: 'Twitch Yayınlarının Duyurulacağı Kanalı Ayarlar.',
    usage: 'tw-kanal-ayarla <#kanal>'
}
