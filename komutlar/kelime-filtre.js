const Discord = require('discord.js');
const fs = require('fs');

//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  const customArgs = args.join(' ').split(",") || args.join(' ').split(", ")
	const x = customArgs[0]

	if(!x) return message.reply(`Lütfen filtreye eklenerek engellenecek kelimeleri yazınız. \n**NOT:** Kelimeleri yazar iken \`,\` ile ayırınız. \n**Örnek:** \`${client.ayarlar.prefix}kelime-filtresi mal,salak\``);
    
  if (args[0] === 'kapat') {
    db.delete(`kFiltre_${message.guild.id}`)
    	message.channel.send("Kelime Filtresi Sistemi başarıyla kapatıldı!")
  }
  
  if (args[0] !== 'kapat') {
  
  var y = ''
    for (var i = 0; i < customArgs.length; i++) {
    let xx = customArgs[i]
    db.push(`kFiltre_${message.guild.id}`, xx)
      
      var şuanki = customArgs[i]
      if (i === 0) {
        y += şuanki
      }
      else if (i === customArgs.length - 1) {
				y += " ve " + şuanki;
			} else {
				y += ", " + şuanki
			}
    }
    
		message.channel.send("Kelime Filtresi Sistemi başarıyla açıldı!")
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`\`${y}\` kelimeleri başarıyla engellenecek!`)
    message.channel.send({embed:embed})
  }
  
};

	exports.conf = {
		enabled: false,
		guildOnly: false,
		aliases: ['kelimefiltresi', 'kelime-filtre', 'kelimefiltre', 'kfiltre', 'k-filtre'],
		permLevel: 4,
    kategori: "ayarlar"
	};
	  
	exports.help = {
		name: 'kelime-filtresi',
		description: 'Yazdığınız kelimeleri engellemek üzere filtreye ekler. Ve kelime filtresi sistemini aktif eder.',
		usage: 'kelime filtresi [engellenecek kelimeler , ile ayırarak/kapat]'
	};