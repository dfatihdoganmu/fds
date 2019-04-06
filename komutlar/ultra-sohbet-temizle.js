const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  const secenekler = args.slice(0).join(' ');
  
	if(secenekler.length < 1) return message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setAuthor('Ultra Sohbet Temizleyicisi').setDescription(`Ultra sohbet temizleme sistemini açacak iseniz: \`rb!ultra-sohbet-temizle aç\` \nKapatacak iseniz: \`rb!ultra-sohbet-temizle kapat\` yazınız!`));

  if (secenekler !== "aç" && secenekler !== "AÇ" && secenekler !== "kapat" && secenekler !== "KAPAT" && secenekler !== "ac" && secenekler !== "on" && secenekler !== "ON" && secenekler !== "off" && secenekler !== "OFF") return message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setAuthor('Ultra Sohbet Temizleyicisi').setDescription(`Ultra sohbet temizleme sistemini açacak iseniz: \`rb!ultra-sohbet-temizle aç\` \nKapatacak iseniz: \`rb!ultra-sohbet-temizle kapat\` yazınız!`));
  
	if (secenekler === "aç" || secenekler == "AÇ" || secenekler == "ac" || secenekler == "AC" || secenekler === "on" || secenekler == "ON") {
    
    db.set(`Usohbet_${message.channel.id}`, "acik")
    
		message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setAuthor('Ultra Sohbet Temizleyicisi').setDescription("Ultra sohbet temizleme sistemi başarıyla açıldı!"));

	}

	if (secenekler === "kapat" || secenekler === "KAPAT" || secenekler === "off" || secenekler === "ON") {
    
    db.set(`Usohbet_${message.channel.id}`, "kapali")
    
		message.channel.send(new Discord.RichEmbed().setColor("RANDOM").setAuthor('Ultra Sohbet Temizleyicisi').setDescription("Ultra sohbet temizleme sistemi başarıyla kapatıldı!"));
    
	}
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['ultrasohbettemizleme', 'ultra-sohbet-temizleme', 'ultra-sohbet-temizleyicisi', 'ultrasohbettemizleyicisi', 'ultrasohbettemizle', 'utemizle', 'utemizleme', 'utemizleyicisi', 'u-temizle', 'u-temizleme', 'u-temizleyicisi'],
kategori: 'ayarlar',
permLevel: 4
};

exports.help = {
name: 'ultra-sohbet-temizle',
description: 'Botların mesajlarını 5 saniye içerisinde temizler!',
usage: 'ultra-sohbet-temizle <aç>/<kapat>'
};