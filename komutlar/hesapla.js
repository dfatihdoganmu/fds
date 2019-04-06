const Discord = require('discord.js');
const up = require('useful-package');
const stripIndents = require('common-tags').stripIndents



exports.run = function(client, message, args) {
  
    var soru = args.join(' ');
    
    if(!soru) return message.reply("Hesaplanacak işlemi yazmalısın!")
    else { 
      let cevap;
        try {
            cevap = up.matematik(soru)
        } catch(err) {
            message.channel.send("Lütfen geçerli bir işlem yazınız!")
        }
      
        message.channel.send(`**${soru.replace("-", " - ").replace("+", " + ").replace("/", " / ").replace("*", " * ")} = ${cevap.toString().replace("Infinity", "Sonsuz") || "Bilinmiyor"}**`)
    }


};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["matematik"],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'hesapla',
  category: "kullanıcı",
  description: 'Belirtilen işlemi yapar.',
  usage: 'hesapla [işlem]'
};