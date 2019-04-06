const Discord = require('discord.js');
const fs = require('fs');

//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

  const db = require('quick.db');
	const secenekler = args.slice(0).join(' ');

	if(secenekler.length < 1) return message.reply(`Küfür engelleme sistemini açacak iseniz \`${client.ayarlar.prefix}küfür-engelle aç\`, kapatacak iseniz \`${client.ayarlar.prefix}küfür-engelle kapat\` yazınız.`);

  if (secenekler !== "aç" && secenekler !== "kapat" && secenekler !== "on" && secenekler !== "off") return message.reply(`Küfür engelleme sistemini açacak iseniz \`${client.ayarlar.prefix}küfür-engelle aç\`, kapatacak iseniz \`${client.ayarlar.prefix}küfür-engelle kapat\` yazınız.`);
  
	if (secenekler === "aç" || secenekler === "on") {
    
    db.set(`küfürE_${message.guild.id}`, "acik")
    
		message.channel.send("Küfür Engelleme Sistemi başarıyla açıldı!")

	};

	if (secenekler === "kapat" || secenekler === "off") {
    
    db.delete(`küfürE_${message.guild.id}`)
    
		message.channel.send("Küfür Engelleme Sistemi başarıyla kapatıldı!")
    
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['küfür-engel'],
		permLevel: 4,
    kategori: "ayarlar"
	};
	  
	exports.help = {
		name: 'küfür-engelle',
		description: 'Küfür engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'küfür-engelle [aç/kapat]'
	};