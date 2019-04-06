const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args, dil, dill) => {

  const db = require('quick.db');
    
  if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.reply(dil.izin)
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
 // if (db.has(`mLog_${message.guild.id}`) === false) return message.reply(dil.ayarlar.errors.mlogayarsiz.replace("{prefix}", client.ayarlar.prefix));
  if (!user) return message.reply(dil.user);
  //if (!reason) return message.reply(`**${user.tag}** adlı kullanıcıyı yasaklama sebebini yazmalısın!`);
  if (user.id === message.author.id) return message.reply(dil.noyou);
  
  if (message.guild.members.get(user.id).highestRole.calculatedPosition > message.member.highestRole.calculatedPosition) return message.channel.send(dil.rolErr)
  if (message.guild.members.get(user.id).bannable === false) return message.channel.send(dil.islemErr);
  
  var islem = 'yasaklama'
  if (dill === 'en') {  var islem = 'ban' }
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField(dil.modlog.islem, islem.toProperCase())
  .addField(dil.modlog.kisi, `${user.tag} (${user.id})`)
  .addField(dil.modlog.yetkili, `${message.author.username}#${message.author.discriminator}`)
  .addField(dil.modlog.sebep, reason || dil.belirtilmemis)
 if(db.has(`mLog_${message.guild.id}`) === true) return message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`)).send(embed);
  
  message.guild.ban(user, 2);
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(dil.basarili)
  .addField(dil.modlog.kisi, `${user.tag} (${user.id})`)
  .addField(dil.modlog.sebep, reason || dil.belirtilmemis)
  message.channel.send(embed2)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ban'],
  permLevel: 3,
    kategori: "moderasyon",
};

exports.help = {
  name: 'yasakla',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla [@kullanıcı] [<sebep>]',
};