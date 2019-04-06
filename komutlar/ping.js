const Discord = require('discord.js')

exports.run = async (client, message, args) => {
	
  message.channel.send(`Bot Gecikmesi: ${client.ping} milisaniye. \nMesaj Gecikmesi: ${new Date().getTime() - message.createdTimestamp} milisaniye.`)
  
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0,
	kategori: 'genel'
}

exports.help = {
	name: 'ping',
	description: 'Botun gecikme süresini gösterir.',
	usage: ''
}
