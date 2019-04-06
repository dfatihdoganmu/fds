const qrcode = require("qrcode");
const tempy = require("tempy");
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    const qrOutput = tempy.file({ extension: "png" });
    if (args.length > 0) {
        qrcode.toFile(qrOutput, args.join(" "), { margin: 1 }, (error) => {
            if (error) throw new Error(error);
            message.channel.send({
                files: [{
                    attachment: qrOutput,
                    name: "qr.png"
                }]
            });
                                      });
    }else{
        message.channel.sendEmbed(new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor('Hata')
        .setDescription('QR Oluşturmak İçin Yazı Yazman Gerek'))
    }
}
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['qr', 'qrkod'],
  permLevel: 0,
  kategori: 'kullanıcı'
};

exports.help = {
  name: 'qroluştur',
  description: 'Yazdığınız Yazıyı QR Olarak Atar.',
  usage: 'qroluştur [yazı]'
};