const Discord = require('discord.js');
const cleverbot = require("cleverbot.io");
const clever = new cleverbot("yRT2w1GqlMtezdq9", "RdmCkKfr0yfOTPMYS2CWpDysSSEWsENr");

exports.run = async (client, message, args) => {
  var x = "Cevaplanıyor lütfen bekleyiniz..."
  
  
  var soru = args.slice(0).join(' ');
  if (soru.length < 1) return message.reply("Bota sormak istediğin soruyu yazmalısın!")
  
  var m = await message.channel.send(x)
    clever.setNick("Yapay Zeka");
    clever.create(function(err, session) {
        clever.ask(soru, function(err, res) {
           if (soru === "baban kim?" || soru === "baban kim" || soru === "baban?" || soru === "Baban kim?" || soru === "Baban kim" || soru === "Baban Kim" || soru === "Baban?" || soru === "Baban Kim?") {
             res = "Doğan."
           }
          
            return m.edit(`<@${message.author.id}>, ${res}`)
        });
    });
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['soru-sor'],
  permLevel: 0,
    kategori: "eğlence",
  category: "fun"
};

exports.help = {
  name: 'sor',
  description: 'Yapay zeka ile sorularınıza cevap verir.',
  usage: 'sor [soru]'
};
 