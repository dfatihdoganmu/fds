const Discord = require('discord.js')
var titleCase = require('title-case');

exports.run = async (client, message, args) => {
  
	if (!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription("Hava durumunu göstereceğim şehri yazmalısın!")
			.setColor("RANDOM")
		message.channel.send({embed})
		return
	}

	const konum = args.join(" ")
	message.channel.send(`:white_sun_small_cloud: | ${titleCase(konum, 'tr')} Havadurumu Bilgisi`, {
		files: [
			`http://wttr.in/${konum}_0tqp_lang=tr.png`
		]
	})
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['hava', 'hava-durumu', 'havabilgisi', 'hava-bilgisi', 'weather', 'weatherforecast'],
	permLevel: 0,
	kategori: 'arama'
}

exports.help = {
	name: 'havadurumu',
	description: 'Yazılan konumun hava durumu bilgisini gösterir.',
	usage: 'havadurumu [konum]'
}