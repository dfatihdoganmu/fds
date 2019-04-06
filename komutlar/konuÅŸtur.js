const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ms = require("ms");

exports.run = async (client, message, args) => {
  
  if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.reply(`Yeterli izinlere sahip değilim! \n**İhtiyacım Olan Yetki:** \n\`Rolleri Yönet\``)
  //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);

  let user = message.mentions.users.first();

  //let reason = args.slice(2).join(' ');

  //if (db.has(`sRol_${message.guild.id}`) === false) return message.reply(`Bu sunucuda Susturma rolü ayarlı değil! Lütfen \`${client.ayarlar.prefix}sustur-rol-ayarla\` yazarak Susturma rolü ayarlayınız.`);
  let x = message.guild.roles.find(r=>r.name==='Susturulmuş')
  if (!x) {
    x = await message.guild.createRole({
        name: "Susturulmuş",
        color: "grey",
        permissions:[]
      })
        await message.channel.overwritePermissions(x, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
  }
  
  let muteRole = message.guild.roles.get(db.has(`sRol_${message.guild.id}`) ? db.fetch(`sRol_${message.guild.id}`) : x.id);
  if (message.mentions.users.size < 1) return message.reply('Susturması kaldırılacak kişiyi etiketlemelisin!');
  //if (reason.length < 1 && !reason) return message.reply('Susturma sebebini yazmalısın! \nkullanıcı, sebep ve süre arasına - koyarak yazınız');
  if (user.id === message.author.id) return message.reply('Kendini konuşturamazsın!');

  if (message.guild.members.get(user.id).highestRole.calculatedPosition > message.member.highestRole.calculatedPosition) return message.channel.send(`Bu kişinin \`rolü/rolleri\` senin \`rolün/rollerinden\` daha yüksek.`)
  
 if (!message.guild.member(user).roles.has(muteRole.id)) return message.reply("Bu kişi susturulmamış!");
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Susturma Kaldırma')
  .addField('Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Yetkili', `${message.author.username}#${message.author.discriminator}`)
  //.addField('Susturma Sebebi', "```" + reason + "```")
   if(db.has(`mLog_${message.guild.id}`) === true) return message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`)).send(embed);

  await message.guild.members.get(user.id).removeRole(muteRole)
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`<@${user.id}> adlı kullanıcının susturması başarıyla kaldırıldı!`)
  message.channel.send(embed2)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: 1,
    kategori: "moderasyon"
};

exports.help = {
  name: 'konuştur',
  category: 'moderasyon',
  description: 'Susturulmuş bir kişinin susturmasını kaldırır.',
  usage: 'konuştur [@kullanıcı]'
};