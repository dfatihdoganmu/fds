const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  
  if (!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) return message.reply("Benim yeterli iznim yok!")
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');

  if (!user) return message.reply("Sunucudan atılacak kullanıcıyı etiketlemelisin!");
  //if (!reason) return message.reply(`**${user.tag}** adlı kullanıcının neden atılacağını yazmalısın!`);
  if (user.id === message.author.id) return message.reply("Kendini atamazsın!");

  
  if (message.guild.members.get(user.id).highestRole.calculatedPosition > message.member.highestRole.calculatedPosition) return message.channel.send(`Bu kişinin \`rolü/rolleri\` senin \`rolün/rollerinden\` daha yüksek.`)
  if (message.guild.members.get(user.id).kickable === false) return message.channel.send(`Bu kişiyi sunucudan atamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField("Yapılan İşlem", "Atma")
  .addField("Kullanıcı", `${user.tag} (${user.id})`)
  .addField("Yetkili", `${message.author.username}#${message.author.discriminator}`)
  .addField("Sebep", reason || "Belirtilmemiş")
   if(db.has(`mLog_${message.guild.id}`) === true) return message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`)).send(embed);
  
  message.guild.member(user).kick();
  
  if (reason) {
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**${user.tag}** adlı kullanıcı başarıyla \`${reason}\` sebebi ile **${message.author.tag}** adlı yetkili tarafından sunucudan atıldı!`)
  message.channel.send(embed2)
  }
  
   if (!reason) {
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**${user.tag}** adlı kullanıcı başarıyla  **${message.author.tag}** adlı yetkili tarafından sunucudan atıldı!`)
  message.channel.send(embed2)
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kick'],
  permLevel: 2,
    kategori: "moderasyon"
};

exports.help = {
  name: 'at',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'at [@kullanıcı] [<sebep>]'
};