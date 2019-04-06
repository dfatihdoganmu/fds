const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    
  const db = require('quick.db');
  
   const x = args.slice(0).join(' ');
  
    if (!x) return message.reply("Oylama konusunu yazınız!");
    
    // Create Embed
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${client.user.username} - Oylama Sistemi`)
        .addField("Oylama", x)
        .addField("Yapılması Gerekenler", "Kabul etmek için ✅ tepkisine, \nKabul etmemek için ise ❌ tepkisine tıklayın!")
        .setFooter("Oylama 1 dakika sonra sona erecek!")
    let msg = await message.channel.send(embed)
        .then(function (msg) {
          db.set(`oylamaM_${message.guild.id}`, msg.id)
          msg.react("✅");
            msg.react("❌");
          setTimeout(function() {
            const e = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} - Oylama Sistemi`)
            .addField("Oylama", x)
            .addField("Sonuçlar", `** Kabul Edilme (✅):** ${db.fetch(`oylamaE_${message.guild.id}`) || 0} \n** Kabul Edilmeme (❌):** ${db.fetch(`oylamaH_${message.guild.id}`) || 0}`)
            .setFooter("Oylama sona erdi!")
            message.channel.send(e)
          }, 60000)
          
          setTimeout(function() {
            
          db.delete(`oylamaE_${message.guild.id}`)
          db.delete(`oylamaH_${message.guild.id}`)
          db.delete(`oylamaM_${message.guild.id}`)
            
          }, 65000)
          
            }).catch(function(error) {
            console.log(error);
        });
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["anket", "oylama-yap", "anket-aç"],
  permLevel: 4,
  kategori: "sunucu"
};

exports.help = {
  name: 'oylama',
  description: 'Sunucunuzda oylama yapmanızı sağlar.',
  usage: 'oylama [mesaj]'
};