const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');

exports.run = async (client, message, args, dil, dill) => {
  
  const a = args[0]
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || `${dil.ayarlar.errors.degismemis} (${client.ayarlar.prefix})`;
  
  var ac = client.emojis.get("533595128057561088")
  var ka = client.emojis.get("533595150971305984")
  var p = client.emojis.get("533595122583994368")
 //ozelgorusuruz_${message.guild.id} 
  let y = db.has(`kFiltre_${message.guild.id}`) ? db.fetch(`kFiltre_${message.guild.id}`).join(', ') : ka
  
if (!a && a !== "destek" && a !== "kapat" && a !== "liste" && a !== "support" && a !== "off" && a !== "list") {
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.guild.name} - ${dil.ayarlar.header}`, `http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Settings-icon.png`)
  //.setTitle("Gelişmiş Destek Sistemi Ayarları")
  .addField(dil.ayarlar.serverprefix, `${p} ${prefix}`)  
 // .addField("Sunucu Ön-Eki/Prefixi", `${p} ${prefix}`, true)
  .addField(dil.ayarlar.gc, db.has(`gc_${message.guild.id}`) ? ac + "<#"+message.guild.channels.get(db.fetch(`gc_${message.guild.id}`)).id+">" : ka, true)
 // .addField("Davet Kayıtları Kanalı", db.has(`davetK_${message.guild.id}`) ? ac + "<#"+message.guild.channels.get(db.fetch(`davetK_${message.guild.id}`)).id+">" : ka, true)
  .addField(dil.ayarlar.mlog, db.has(`mLog_${message.guild.id}`) ? `${ac} \<#${db.fetch(`mLog_${message.guild.id}`)}>` : `${ka}`, true)
  .addField(dil.ayarlar.log, db.has(`log_${message.guild.id}`) ? `${ac} \<#${message.guild.channels.get(db.fetch(`log_${message.guild.id}`)).id}>` : `${ka}`, true)
  .addField(dil.ayarlar.otorolK, db.has(`otoRolK_${message.guild.id}`) ? "<#"+message.guild.channels.get(db.fetch(`otoRolK_${message.guild.id}`)).id+">" : `${ka}`, true)
  .addField(dil.ayarlar.linkengel, db.has(`linkE_${message.guild.id}`) ? `${ac}` : `${ka}`, true)
  .addField(dil.ayarlar.kufurengel, db.has(`küfürE_${message.guild.id}`) ? `${ac}` : `${ka}` ,true)
   .addField("Menitios Engelleme", db.has(`ever_${message.guild.id}`) ? `${ac}` : `${ka}` ,true)
  .addField("Caps Lock Engelleme", db.has(`capsE_${message.guild.id}`) ? `${ac}` : `${ka}` ,true)
  //.addField("Twitch Yayın Kanalı", db.has(`twcanlı_${message.guild.id}`) ? `${ac}` : `${ka}` ,true)
  .addField("Kelime Filtresi", `${ac} ${y}`, true)
  .addField(dil.ayarlar.otorol, db.has(`otoR_${message.guild.id}`) ? `${ac} \`@${message.guild.roles.get(db.fetch(`otoR_${message.guild.id}`)).name}\`` : `${ka}`, true)
  .addField(dil.ayarlar.susturrol, db.has(`sRol_${message.guild.id}`) ? `${ac} \`@${message.guild.roles.get(db.fetch(`sRol_${message.guild.id}`)).name}\`` : `${ka}`, true)
  .addField(dil.ayarlar.sayacK, db.has(`sKanal_${message.guild.id}`) ? `${ac} \<#${message.guild.channels.get(db.fetch(`sKanal_${message.guild.id}`)).id}>` : `${ka}`, true)
  .addField(dil.ayarlar.sayac, db.has(`sayac_${message.guild.id}`) ? `${ac} ${db.fetch(`sayac_${message.guild.id}`)}` : `${ka}`, true)
  .addField(dil.ayarlar.tag, db.has(`tag_${message.guild.id}`) ? `${ac} ${db.fetch(`tag_${message.guild.id}`)}`: `${ka}`, true)
  .addField(dil.ayarlar.tagK, db.has(`tagKanal_${message.guild.id}`) ? `${ac} \<#${message.guild.channels.get(db.fetch(`tagKanal_${message.guild.id}`)).id}>`: `${ka}`, true)
  .addField(dil.ayarlar.gm, db.has(`girisM_${message.guild.id}`) ? db.fetch(`girisM_${message.guild.id}`).replace("{kişisayısı}", "**{kişisayısı}**").replace("{sunucu}", "**{sunucu}**").replace("{kullanıcı}", "**{kullanıcı}**").replace("{user}", "**{user}**").replace("{numberuser}", "**{numberuser}**").replace("{server}", "**{server}**") : ka, true)
  .addField(dil.ayarlar.cm, db.has(`cikisM_${message.guild.id}`) ? db.fetch(`cikisM_${message.guild.id}`).replace("{kişisayısı}", "**{kişisayısı}**").replace("{sunucu}", "**{sunucu}").replace("{kullanıcı}", "**{kullanıcı}**").replace("{user}", "**{user}**").replace("{numberuser}", "**{numberuser}**").replace("{server}", "**{server}**") : ka, true)
  .addField("Sayaç Giriş Mesajı", db.has(`sayacGM_${message.guild.id}`) ? db.fetch(`sayacGM_${message.guild.id}`).replace("{kullanıcı}", "**{kullanıcı}**").replace("{hedef}", "**{hedef}**").replace("{üye}", "**{üye}**") : ka, true)
  .addField("Sayaç Çıkış Mesajı", db.has(`sayacCM_${message.guild.id}`) ? db.fetch(`sayacCM_${message.guild.id}`).replace("{kullanıcı}", "**{kullanıcı}**").replace("{hedef}", "**{hedef}**").replace("{üye}", "**{üye}**") : ka, true)
  .addField("Özelden Hoşgeldin Mesajı", db.has(`ozelhosgeldin_${message.guild.id} `) ? db.fetch(`ozelhosgeldin_${message.guild.id} _${message.guild.id}`).replace("-kullanıcı-", "**-kullanıcı-**").replace("-sunucu-", "**-sunucu-**") : ka, true)
  .addField("Özelden Görüşürüz Mesajı", db.has(`ozelgorusuruz_${message.guild.id} `) ? db.fetch(`ozelgorusuruz_${message.guild.id} _${message.guild.id}`).replace("-kullanıcı-", "**-kullanıcı-**").replace("-sunucu-", "**-sunucu-**") : ka, true)
  //.addField('Twitch Kanal', db.has(`twkanal_${message.guild.id}`) ? "<#"+message.guild.channels.get(db.fetch(`twkanal_${message.guild.id}`)).id+">" : `${ka}`, true)
  
  //.setThumbnail('https://cdn0.iconfinder.com/data/icons/web-seo-development-vol-2-5/32/45_maintenance_services_wrench_setting_support_tools-512.png')
  .setFooter(`${client.user.username} - Gelişmiş Ayarlar ve daha fazlası...Destek Ayarlarını görmek için ${client.ayarlar.prefix}ayarlar destek yazabilirsiniz | Botu eklemek için ${client.ayarlar.prefix}davet yazabilirsiniz.`, client.user.avatarURL)
  message.channel.send(embed)
  return;
}//twkanal_${message.guild.id}
  
  if (a === "destek" || a === "support") {
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`» ${message.guild.name} - Destek Sistemi Ayarları «`, `http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Settings-icon.png`)
  .addField(dil.ayarlar.destekK, db.has(`destekK_${message.guild.id}`) ? ac + "<#"+message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`)).id+">" : `${ka}`, true)
  .addField(dil.ayarlar.destekR, db.has(`destekR_${message.guild.id}`) ? ac + "`@"+message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`)).name+"`" : `${ka}`, true)
  .addField(dil.ayarlar.destekM, db.has(`destekM_${message.guild.id}`) ? ac + db.fetch(`destekM_${message.guild.id}`) : ka)
  //.setThumbnail('https://cdn0.iconfinder.com/data/icons/web-seo-development-vol-2-5/32/45_maintenance_services_wrench_setting_support_tools-512.png')
  .setFooter(`${client.user.username} | Destek Sistemi Ayarları | Botu eklemek için: ${client.ayarlar.prefix}davet yazabilirsiniz.`, client.user.avatarURL)
  message.channel.send(embed)
  return;
 }
  
if (a === "liste" || a === "list") {
  if (dill === 'tr') {
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username} - Ayarlar Kapatma Kodları`)
  .addField("Giriş Çıkış", "`giriş-çıkış`")
  .addField("Moderasyon Kayıtları", "`mod-log`")
  .addField("Sunucu Kayıtları", "`log`")
  .addField("Link Engelleme Sistemi", "`link-engel`")
  .addField("Küfür Engelleme Sistemi", "`küfür-engel`")
  .addField("Otomatik Rol", "`oto-rol`")
  .addField("Susturma Rolü", "`sustur-rol`")
  .addField("Sayaç Kanalı", "`sayaç-kanal`")
  .addField("Sayaç", "`sayaç`")
  .addField("Giriş Mesajı", "`giriş-mesaj`")
  .addField("Çıkış Mesajı", "`çıkış-mesaj`")
  .addField("Destek Sistemi Kanalı", "`destek-kanal`")
  .addField("Destek Sistemi Rolü", "`destek-rol`")
  .addField("Destek Mesajı", "`destek-mesaj`")
  .addField("Giriş Çıkış Kanalı", "`rgiriş-çıkış`")
  .addField("Everyone Engelleme","`everyone-engelleme`")
  .addField("Caps Lock Engelleme","`caps-lock-engelleme`")
  message.channel.send(embed)
}
  
   if (dill === 'en') {
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username} - Settings Shutdown Codes`)
  .addField("İnput Output", "`input-output`")
  .addField("Moderation Records", "`mod-log`")
  .addField("Server Records", "`log`")
  .addField("Link Blocking System", "`link-block`")
  .addField("Swearing Blocking System", "`swearing-block`")
  .addField("Auto Role", "`auto-role`")
  .addField("Mute Role", "`mute-role`")
  .addField("Counter Channel", "`counter-channel`")
  .addField("Counter", "`counter`")
  .addField("İnput Message", "`input-message`")
  .addField("Output Message", "`output-message`")
  .addField("Support System Channel", "`support-channel`")
  .addField("Support System Role", "`support-role`")
  .addField("Support System Message", "`support-message`")
  .addField ("Input Output Channel", "` rinput-output ")
  .addField ("Everyone Blocking", "everyone-blocking")//caps lock blocking
  .addField ("caps lock blocking", "caps lock blocking")
  message.channel.send(embed)
}
}
  
if (a === "kapat" || a === "off" || a === "sıfırla" || a === "reset") {
  
  var x = args[1];
  
  if (!x) {
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.ayarlar.errors.kapat)
    .setFooter(dil.ayarlar.errors.kapatf.replace('{prefix}', client.ayarlar.prefix))
    message.channel.send(e)
  }
  
  if (x === "giriş-çıkış" || x === "input-output") {
    db.delete(`gc_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "mod-log") {
    db.delete(`mLog_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "log") {
    db.delete(`log_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "link-engel") {
    db.delete(`linkE_${message.guild.id}`)
    
   let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
    if (x === "Resimli iriş Çıkış Kanalı") {
    db.delete(`memberChannel_${message.guild.id}`)
    
   let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  if (x === "küfür-engel") {
    db.delete(`küfürE_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "oto-rol") {
    db.delete(`otoR_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "sustur-rol") {
    db.delete(`sRol_${message.guild.id}`)
    
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "sayaç-kanal") {
    db.delete(`sKanal_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "sayaç") {
    db.delete(`sayac_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "giriş-mesaj") {
    db.delete(`girisM_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "çıkış-mesaj") {
    db.delete(`cikisM_${message.guild.id}`)
  
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "destek-kanal") {
    db.delete(`destekK_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "destek-rol") {
    db.delete(`destekR_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  //capsE_${message.guild.id}
  if (x === "destek-mesaj") {
    db.delete(`destekM_${message.guild.id}`)
  
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }  if (x === "everyone-engelleme") {
    db.delete(`ever_${message.guild.id}`)
  
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
    
  if (x === "caps-lock-engelleme") {
    db.delete(`capsE_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  if (x === "hepsi" || x === "all") {
    
    db.delete(`gc_${message.guild.id}`)
    
    db.delete(`capsE_${message.guild.id}`)
    
    db.delete(`mLog_${message.guild.id}`)

    db.delete(`log_${message.guild.id}`)
    
    db.delete(`linkE_${message.guild.id}`)

    db.delete(`küfürE_${message.guild.id}`)

    db.delete(`otoR_${message.guild.id}`)
    
    db.delete(`sRol_${message.guild.id}`)
  
    db.delete(`sKanal_${message.guild.id}`)
  
    db.delete(`sayac_${message.guild.id}`)
  
    db.delete(`girisM_${message.guild.id}`)
  
    db.delete(`cikisM_${message.guild.id}`)
    
    db.delete(`destekK_${message.guild.id}`)

    db.delete(`destekR_${message.guild.id}`)
    
    db.delete(`destekM_${message.guild.id}`)
    
    db.delete(`otoRolK_${message.guild.id}`)
    
    db.delete(`tag_${message.guild.id}`)
    
    db.delete(`tagK_${message.guild.id}`)
    
    db.delete(`memberChannel_${message.guild.id}`)
    
    db.delete(`ever_${message.guild.id}`)
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
    
  }
  
}
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["settings"],
    permLevel: 4,
    kategori: "sunucu"
  };
  
  exports.help = {
    name: 'ayarlar',
    description: 'Sunucu ayarlarını gösterir.',
    usage: 'ayarlar [<kapat>]'
  };