const Discord = require('discord.js');
const request = require('request');

var mcPort = 25565
var prefix = "rb!";
exports.run = (client, message, args) => {
const emoji1 = message.client.emojis.get('479318504495906827');

  if (!args[0]) return message.reply('Lütfen bir `IP` adresi belirt');
  if (message.content.startsWith(prefix + "mcserver")) {
      var url = 'http://mcapi.us/server/status?ip=' + args[0] + '&port=' + mcPort;
		let reason = args.slice(0).join(' ');
        request(url, function (err, response, body) {
            if (err) {
                console.log(err);
                return message.channel.sendEmbed(new Discord.RichEmbed().setTitle('Hata!').addField('Sunucu bilgileri alınırken beklenmedik bir hatayla karşılaştık.').setThumbnail("https://i.hizliresim.com/OyBm5D.png").setAuthor("Rahatsız Bot").setFooter('2018 © Tüm hakları saklıdır.').setColor('RANDOM').setTimestamp());
            }
            body = JSON.parse(body);
            var status = `${emoji1} Sunucu » **${reason}** \n\n${emoji1} Sunucu şu anda aktif mi » **Hayır**\n\n${emoji1} Bu IP adresi bir sunucuya ait değil veya sunucu şu anda kapalı.`;
            if (body.online) {
			status = `${emoji1} Sunucu adı » **${reason}** \n\n${emoji1} Sunucu şu anda aktif mi » **Evet**\n\n${emoji1} Sunucu versiyonu » **${body.server.name}**\n\n`;
                if (body.players.now) {
                    status += `${emoji1} Aktif oyuncu sayısı » **${body.players.now}**/**${body.players.max}**\n\n${emoji1} Açıklama » **${body.motd}**`;
					} else {
						status += `${emoji1} Şu anda sunucuda kimse yok.`;
                }
            }
            message.channel.sendEmbed(new Discord.RichEmbed().setDescription(status).setThumbnail('https://i.hizliresim.com/ByrQRG.png').setColor('RANDOM').setFooter('' + body.motd + ''));
        });
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mcserver', 'mc server'],
  permLevel: 0,
  kategori: 'arama' 
};

exports.help = {
  name: 'mcserver',
  description: 'Minecraft sunucu bilgisini verir.',
  usage: 'mcserver <sunucu IP>'
};