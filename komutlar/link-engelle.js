const Discord = require('discord.js');
const fs = require('fs');

//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  
	const secenekler = args.slice(0).join(' ');

	if(secenekler.length < 1) return message.reply(`Link engelleme sistemini açacak iseniz \`${client.ayarlar.prefix}link-engelle aç\`, kapatacak iseniz \`${client.ayarlar.prefix}link-engelle kapat\` yazınız.`);

  if (secenekler !== "aç" && secenekler !== "kapat" && secenekler !== "on" && secenekler !== "off") return message.reply(`Link engelleme sistemini açacak iseniz \`${client.ayarlar.prefix}link-engelle aç\`, kapatacak iseniz \`${client.ayarlar.prefix}link-engelle kapat\` yazınız.`);
  
	if (secenekler === "aç" || secenekler === "on") {
		
   db.set(`linkE_${message.guild.id}`, 'acik')
    
		message.channel.send("Link Engelleme Sistemi başarıyla açıldı!")
	};

	if (secenekler === "kapat" || secenekler === "off") {
    
    db.delete(`linkE_${message.guild.id}`)
    
		message.channel.send("Link Engelleme Sistemi başarıyla kapatıldı!")
    
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['link-engel'],
		permLevel: 4,
    kategori: "ayarlar"
	  };
	  
	exports.help = {
		name: 'link-engelle',
		description: 'Lİnk engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'link-engelle [aç/kapat]'
	};