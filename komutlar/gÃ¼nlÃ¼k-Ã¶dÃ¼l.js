const Discord = require("discord.js");
const fs = require("fs");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  
   if (talkedRecently.has(message.author.id)) {
        return message.channel.send("Tekrar günlük ödül alabilmek için `24` saat beklemelisin.");
} else {
  
db.add(`para_${message.author.id}`, 500)
  
  message.reply("Başarıyla günlük ödülün olan **500** RhtCoini aldın!")
  
talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
        }, 86400000);
    }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["günlük-maaş", "günlük-hediye", "daily"],
  permLevel: 0,
    kategori: "profil"
};

exports.help = {
  name: "günlük-ödül",
  description: "Günlük 500 RhtCoin alırsınız.",
  usage: ""
};