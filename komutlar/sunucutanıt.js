const Discord = require('discord.js')

const ms = require("ms")
const db = require('quick.db')
exports.run = async (client, message, args) => {    let cooldown = 8.64e+7, // 24 Saat
        amount = Math.floor(Math.random() * 1000) + 4000;      

    let lastDaily = await db.fetch(`gunluk_${message.guild.id}`);
    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));

        
		const embed = new Discord.RichEmbed()
    .setDescription('Bu Komutu Sadece `24 Saatte` Bir Kullanabilirsin. \n\n[Destek Sunucuma Gitmek İçin Tıkla](https://discord.gg/hPgBprZ)')
			.setColor(0x00ffff)
		message.channel.send({embed})
        
    } else {
        const embed = new Discord.RichEmbed()
  .setTitle('Başarılı :thumbsup:')
.setDescription(' **Sunucunuz Başarıyla** [Destek Sunucumda](https://discord.gg/hPgBprZ) **Tanıtıldı.**\n**24 Saat Sonra Tekrar Sunucunuzu Tanıtabilirsiniz.**')
        .setColor('GREEN')
 message.channel.sendEmbed(embed);
    message.channel.createInvite({maxAge: 0}).then((invite) => {
        const embed = new Discord.RichEmbed()
            .addField(`Tanıtılan Sunucunun Sahibi`, message.author.tag, true)
            .addField(`Tanıtılan Sunucun İsmi`, message.guild.name, true)
      .addField(`Tanıtılan Sunucudaki Üye Sayısı`, message.guild.members.size, true)
      .addField(`Tanıtılan Sunucu Davet Linki`, invite.url, true)
            .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL)
       client.channels.get('490884082381619220').send(embed)
    db.set(`gunluk_${message.guild.id}`, Date.now());
        })}
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunucutanıt'],
    permLevel: 3,
  kategori: "moderasyon"
}

exports.help = {
    name: 'sunucu-tanıt',
    description: '24 saate bir sunucunuzu destek sunucumda tanıtırım.',
    usage: ''
}