const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
      
  let icerik = await db.fetch(`sonmesajicerik_${message.channel.id}`)
  let sahipid = await db.fetch(`sonmesajsahipid_${message.channel.id}`)

  if(!sahipid) return message.channel.send(":x: | **Hata:** Son silinen mesajı bulamadım sanırım mesaj çok eski veya bu kanalda hiç mesaj silinmemiş ")
  else if(!icerik) return message.channel.send(":x: | **Hata:** Son silinen mesajı bulamadım sanırım mesaj çok eski veya bu kanalda hiç mesaj silinmemiş")
    message.channel.send(new Discord.RichEmbed()
                        .setAuthor(client.users.get(sahipid).tag,client.users.get(sahipid).avatarURL)
                        .addField(`**Mesaj İçeriği:**`,icerik)
                        .setColor('RANDOM')
                        .setFooter(`Kullanıcı ID: ${sahipid}`,client.user.avatarURL))
    

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: 'kullanıcı'
};
 
exports.help = {
  name: 'snipe',
  description: 'Kanalda Son Silinen Mesajı Gösterir.',
  usage: 'snipe <@kullanıcı>'
};  