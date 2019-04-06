const Discord = require('discord.js');

const fs = require("fs");

exports.run = function(client, message, args) {

  let prefix = client.ayar.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix
 
	var str = ''
	   let komutlar = client.cmdd
        if(!komutlar[message.guild.id]) {
            str = "Sunucu içi özel komut bulunmuyor."
        } else {
            for (var i = 0; i < komutlar[message.guild.id].length; i++) {
                str += Object.keys(komutlar[message.guild.id][i])+"\n"
            }
        }
	 if(!args[0]) {
	 const komut = new Discord.RichEmbed()
    .setColor(client.ayarlar.renk)
	.setAuthor("Sunucu İçi Özel Komut Listesi")
	.setDescription(str)
    return  message.channel.send(komut)
	 }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['komutlistesi', 'komutliste', 'komut-liste'],
  permLevel: 0,
  kategori: "özel"
};

exports.help = {
  name: 'komut-listesi',
  description: 'Sunucu içi özel komutları listeler.',
  usage: 'komut-listesi'
};