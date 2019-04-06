const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (client, message, args) => {

 let prefix = client.ayar.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix

	if(!args[0]) {
		message.channel.send("<@"+message.author.id+">, Lütfen silmek istediğiniz özel komutu yazın.\nÖrnek : **`"+prefix+"komut-sil komut`**")
		return
	}

	const komut = args.join(" ")
  
	let komutlar = client.cmdd
	if(komutlar[message.guild.id]) {
		if(komutlar[message.guild.id].length === 1) {
			if(Object.keys(komutlar[message.guild.id][0])[0].toString() === komut) {
				delete komutlar[message.guild.id]
				fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
					console.log(err)
				})
				message.channel.send("<@"+message.author.id+">, "+komut+" adlı özel komut başarıyla silindi.")
				return
			}
		}
		for (var i = 0; i < komutlar[message.guild.id].length; i++) {
			if(Object.keys(komutlar[message.guild.id][i])[0].toString() === komut) {
				komutlar[message.guild.id].splice(i, 1);

				message.channel.send("<@"+message.author.id+">, "+komut+" adlı özel komut başarıyla silindi.")

				fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
					console.log(err)
				})
				return
			}
		}
	} else if (!komutlar[message.guild.id]) {
		message.channel.send("<@"+message.author.id+">, sunucuda hiç özel komut bulunamadı.")
		return
	}
  
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['komutsil'],
	permLevel: 4,
	kategori: 'özel'
}

exports.help = {
	name: 'komut-sil',
	description: 'Sunucu içindeki özel komutlardan belirtilen özel komutu siler.',
	usage: 'komut-sil [komut]'
}