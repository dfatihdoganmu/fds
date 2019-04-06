const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let rol = JSON.parse(fs.readFileSync("././jsonlar/otoR.json", "utf8"));

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  let role = message.mentions.roles.first() || message.guild.roles.find(r=>r.name===args.slice(0).join(' '))
  
    if (!role) {
        return message.reply("Otomatik rol olarak ayarlanacak rolü etiketleyiniz!")
    }
  
     db.set(`otoR_${message.guild.id}`, role.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`Bir kullanıcı sunucuya giriş yaptığında otomatik olarak verilecek rol başarıyla \`${role.name}\` adlı rol olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['oto-rol', 'oto-rol-belirle','otorol',],
    permLevel: 4,
    kategori: "ayarlar"
}

exports.help = {
    name: 'oto-rol-ayarla',
    description: 'Sunucuya birisi katıldıgında verilecek rolü ayarlar.',
    usage: 'oto-rol-ayarla [@rol/rol adı]'
}