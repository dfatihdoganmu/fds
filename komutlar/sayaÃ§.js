const Discord = require('discord.js')
const fs = require('fs')
//const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
	if(!args[0]) {
		return message.reply("Lütfen bir sayı yazınız.")
	}

	//let profil = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));

	if(isNaN(args[0])) {
		return message.reply("Lütfen bir sayı yazınız.")
	}

	if(args[0] <= message.guild.members.size) {
		return message.reply("Lütfen sunucudaki üye sayısından yüksek bir sayı yazınız.")
	}

	/*if(!profil[message.guild.id]){
		profil[message.guild.id] = {
			sayi: args[0]
		};
	}
	
	//profil[message.guild.id].sayi = args[0]
	
	fs.writeFile("./jsonlar/sayac.json", JSON.stringify(profil), (x) => {
        if (x) console.error(x)
      })*/
  
  db.set(`sayac_${message.guild.id}`, args[0])
  
	const embed = new Discord.RichEmbed()
	.setDescription(`Sayaç başarıyla **${args[0]}** olarak ayarlandı!`)
	message.channel.send({embed})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['sayacayarla', 'sayac', 'sayaç'],
	permLevel: 4,
    kategori: "ayarlar"
}

exports.help = {
	name: 'sayaç-ayarla',
	description: 'Sayacı ayarlar.',
	usage: 'saya-çayarla [sayı]'
}