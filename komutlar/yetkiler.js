const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = (client, msg, args) => {


let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;
    
  let user = msg.mentions.users.first() || msg.author
  let member = msg.guild.members.get(user.id)
  
    //yönetici
    if (member.hasPermission("ADMINISTRATOR")) x = "+"
    if (!member.hasPermission("ADMINISTRATOR")) x = "-"
    
    //Denetim kaydı
    if (member.hasPermission("VIEW_AUDIT_LOG")) x2 = "+"
    if (!member.hasPermission("VIEW_AUDIT_LOG")) x2 = "-"
    
    //Sunucuyu yönet
    if (member.hasPermission("MANAGE_GUILD")) x3 = "+"
    if (!member.hasPermission("MANAGE_GUILD")) x3 = "-"
    
    //Rolleri yönet
    if (member.hasPermission("MANAGE_ROLES")) x4 = "+"
    if (!member.hasPermission("MANAGE_ROLES")) x4 = "-"
    
    //Kanalları yönet
    if (member.hasPermission("MANAGE_CHANNELS")) x5 = "+"
    if (!member.hasPermission("MANAGE_CHANNELS")) x5 = "-"
    
    //üyeleri at
    if (member.hasPermission("KICK_MEMBERS")) x6 = "+"
    if (!member.hasPermission("KICK_MEMBERS")) x6 = "-"
    
    //üyeleri yasakla
    if (member.hasPermission("BAN_MEMBERS")) x7 = "+"
    if (!member.hasPermission("BAN_MEMBERS")) x7 = "-"
    
    //mesajları yönet
    if (member.hasPermission("MANAGE_MESSAGES")) x8 = "+"
    if (!member.hasPermission("MANAGE_MESSAGES")) x8 = "-"
    
    //kullanıcı adlarını yönet
    if (member.hasPermission("MANAGE_NICKNAMES")) x9 = "+"
    if (!member.hasPermission("MANAGE_NICKNAMES")) x9 = "-"
    
    //emojileri yönet
    if (member.hasPermission("MANAGE_EMOJIS")) x10 = "+"
    if (!member.hasPermission("MANAGE_EMOJIS")) x10 = "-"
    
    //webhookları yönet
    if (member.hasPermission("MANAGE_WEBHOOKS")) x11 = "+"
    if (!member.hasPermission("MANAGE_WEBHOOKS")) x11 = "-"
  
  let y = '';
  let t = '';
  if (member.user.id === msg.author.id) {
    y = `**Senin Yetkilerin/İzinlerin**`
    t = "Kullanıcı"
  } else {
    y = `**${member.user.tag} Adlı Kullanıcının Yetkileri/İzinleri**`
    t = "Kullanıcı"
  };
  if (member.user.bot === true) {
    y = `**${member.user.tag} Adlı Botun Yetkileri/İzinleri**`
    t = "Bot"
  };
  
  msg.channel.send(y)
    msg.channel.send(stripIndents`
    \`\`\`diff
    ${x} Yönetici
${x2} Denetim Kaydını Görüntüle
${x3} Sunucuyu Yönet
${x4} Rolleri Yönet
${x5} Kanalları Yönet
${x6} Üyeleri At
${x7} Üyeleri Yasakla
${x8} Mesajları Yönet
${x9} Kullanıcı Adlarını Yönet
${x10} Emojileri Yönet
${x11} Webhook'ları Yönet
\`\`\`
   `)
  msg.channel.send("```md\n# Başında \"-\" olanlar o yetkiye sahip olunmadığını gösterir. \n# Başında \"+\" olanlar o yetkiye sahip olunduğunu gösterir. \n[Bu Kişi Ney?]("+t+")\n```")
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['izinler', 'izinlerim', 'yetkilerim'],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'yetkiler',
  description: 'Belirtilen kullanıcının yetkilerini gösterir.',
  usage: 'yetkiler [<@kullanıcı>]'
};