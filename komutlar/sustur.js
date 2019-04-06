const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ms = require("ms");

exports.run = async (client, message, args) => {
  
  if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.reply(`Yeterli izinlere sahip değilim! \n**İhtiyacım Olan Yetki:** \n\`Rolleri Yönet\``)
  //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  const yargs = args.join(' ').split(' - ');
let x = yargs[1]
let y = yargs[2]

  let user = message.mentions.users.first();
  let reason = y
  let sure = x

  //let reason = args.slice(2).join(' ');
  
  let xx = message.guild.roles.find(r=>r.name==='Susturulmuş')
  if (!xx) {
    xx = await message.guild.createRole({
        name: "Susturulmuş",
        color: "grey",
        permissions:[]
      })
        await message.channel.overwritePermissions(x, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
  }
  
  //if (db.has(`sRol_${message.guild.id}`) === false) return message.reply(`Bu sunucuda Susturma rolü ayarlı değil! Lütfen \`${client.ayarlar.prefix}sustur-rol-ayarla\` yazarak Susturma rolü ayarlayınız.`);
  let muteRole = message.guild.roles.get(db.has(`sRol_${message.guild.id}`) ? db.fetch(`sRol_${message.guild.id}`) : xx.id);
  if (message.mentions.users.size < 1) return message.reply('Susturacağın kişiyi etiketlemelisin! \nKullanıcı, sebep ve süre arasına - koyarak yazınız.');
  //if (reason.length < 1 && !reason) return message.reply('Susturma sebebini yazmalısın! \nkullanıcı, sebep ve süre arasına - koyarak yazınız');
  if (!sure) return message.reply('Ne kadar süre susturacağını yazmadın! \n\n**NOT:** Örnek olarak 1 minute şeklinde yazınız. \nSüreyi ingilizce yazmanız gerekmektedir! \n\nGenelde susturmada çok kullanılan süreler: \n\nminute = dakika \nsecond = saniye \nhour = saat \nKullanıcı, sebep ve süre arasına - koyarak yazınız.')
  if (user.id === message.author.id) return message.reply('Kendini susturamazsın!');

  if (message.guild.members.get(user.id).highestRole.calculatedPosition > message.member.highestRole.calculatedPosition) return message.channel.send(`Bu kişinin \`rolü/rolleri\` senin \`rolün/rollerinden\` daha yüksek.`)
  
 if (message.guild.member(user).roles.has(muteRole.id)) return message.reply("Bu kişi zaten susturulmuş!");
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Susturma')
  .addField('Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Sebep', reason || "Belirtilmemiş")
  .addField('Süre', sure.toString().replace(/(minutes|minute|min|m)/, 'dakika').replace(/(seconds|second|sec|s)/, 'saniye').replace(/(hours|hour|h)/, 'saat'))
  //.addField('Susturma Sebebi', "```" + reason + "```")
  if(db.has(`mLog_${message.guild.id}`) === true) return message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`)).send(embed);
  
  //message.guild.channels.forEach(async (channel, id) => {
        message.channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      //});

  await message.guild.members.get(user.id).addRole(muteRole)
  
  if (reason) { 
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`<@${user.id}> adlı kullanıcı başarıyla \`${reason}\` sebebi ile susturuldu!`)
  .addField("Susturulma Süresi", sure.toString().replace(/(minute|min|m)/, 'dakika').replace(/(seconds|second|sec|s)/, 'saniye').replace(/(hours|hour|h)/, 'saat'))
  message.channel.send(embed2)
  }
  
  if (!reason) { 
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`<@${user.id}> adlı kullanıcı başarıyla susturuldu!`)
  .addField("Susturulma Süresi", sure.toString().replace(/(minute|min|m)/, 'dakika').replace(/(seconds|second|sec|s)/, 'saniye').replace(/(hours|hour|h)/, 'saat'))
  message.channel.send(embed2)
  }
  
  setTimeout(function() {
    message.guild.members.get(user.id).removeRole(muteRole)
    message.channel.send(`<@${user.id}> kullanıcısının susturulma süresi bitti ve susturulması kaldırıldı!`);
  }, ms(sure));
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: 1,
    kategori: "moderasyon"
};

exports.help = {
  name: 'sustur',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi istediğiniz süre kadar susturur.',
  usage: 'sustur [@kullanıcı] [süre] [<sebep>]'
};