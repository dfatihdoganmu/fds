const db = require('quick.db')
const { MessageAttachment } = require('quick.db')

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`${message.guild.id}.prefix`) || client.ayarlar.prefix
    let emoji = args.slice(0).join(" ")
    if(!emoji) return message.channel.send(` **${prefix}${exports.help.usage}**`)
    try {
    var id = `${emoji}`.match(/(a)?:(\w{2,32}):(\d{17,19})>/)[3]
    if(emoji.startsWith("<"+emoji.match(/(a)?:(\w{2,32}):(\d{17,19})>/)[1]+":")) {
      var attachment = 'https://cdn.discordapp.com/emojis/'+id+'.gif'
    } else {
      var attachment = 'https://cdn.discordapp.com/emojis/'+id+'.png'
    }
message.channel.send({
    files: [attachment]
});
    return
  } catch (err) {
    console.log(err.message)
      message.channel.send(` Lütfen özel bir emoji girin. Discord'un kendi emojileri jumbolanamaz.`)
    return
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: 'kullanıcı'
};

exports.help = {
    name: "jumbo", //komut adı 
    description: "Girilen emojinin linkini verir.", //komut açıklaması
    usage: "jumbo [emoji]" //komutun doğru kullanımı
};