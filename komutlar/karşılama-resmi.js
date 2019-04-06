const Discord = require('discord.js')
 
exports.run = async (client, message, args) => {
  
  const db = require('quick.db');

  const prefix = db.fetch(`${message.guild.id}.prefix`) || client.ayarlar.prefix
  let resimler = ["varsayılan", "ara-cadde"]
  
    if (!resimler.includes(args[0])) {
        return message.channel.send(`**${prefix}${exports.help.usage}**`)
    }
    var x;
    if(args[0] === resimler[0]) x = 'https://img.revabot.tk/tcj9v37b.png'
    if(args[0] === resimler[1]) x = 'https://img.revabot.tk/blb9po71.png'
    if(db.has(`${message.guild.id}.karşılamaResmi`)) {
      if(args[0] === db.fetch(`${message.guild.id}.karşılamaResmi`)) {
        return message.channel.send(` Karşılama resmi zaten **${args[0].replace("-", " ")}** olarak ayarlanmış?`)
      }
    }
  
    db.set(`${message.guild.id}.karşılamaResmi`, args[0])
  
    message.channel.send(` Karşılama resmi başarıyla **${args[0].replace("-", " ")}** olarak ayarlanmıştır.`)

}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'karşılama-resmi',
  description: 'Karşılama Resmini Ayarlamayı Sağlar.',
  usage: 'karşılama-resmi '
};