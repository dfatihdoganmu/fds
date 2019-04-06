const Discord = require("discord.js");
const db = require("quick.db");
const { stripIndents } = require("common-tags");

let olta = ['olta', '1', 'cWZtP4ZQSA'];
let kilic = ['kılıç ve kalkan', 'kılıç', 'kalkan', '2', 'd60831GsUj'];
let kalem = ['kalem', '3', 'd60831GsUg'];

let genel = ['olta', '1', 'cWZtP4ZQSA', 'kılıç ve kalkan', 'kılıç', 'kalkan', '2', 'd60831GsUj', '3', 'd60831GsUg'];


exports.run = async (client, message, args) => {
 
  const x = new db.table('market');
  
  let user = message.mentions.users.first();
  let a = args[1];
  if (!user) return message.reply("Ürün satacağın kişiyi etiketlemelisin!")
  if (user.id === message.author.id) return message.reply("Kendin ile ticaret yapamazsın!");
  if (user.bot === true) return message.reply("Botlar ile ticaret yapamazsın!");
  if (!a) return message.reply("Hangi ürünü satmak istediğini yazmalısın! \nÜrünler hakkında bilgiyi `"+client.ayarlar.prefix+"market` yazarak görebilirsin!")
  
  if (a) {
  
  if (!genel.includes(a)) {
     let em = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setDescription("Geçersiz ürün! Lütfen bir ürünün adını (küçük harfler ile), kodunu veya numarasını doğru şekilde yazınız.")
      message.channel.send({embed: em})
     return
  }
  
  if (kilic.includes(a) === true) {
    
    if (x.has(`savas_${message.author.id}`) === false) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${kilic[0]}** adlı ürün sende bulunmuyor nasıl satacaksın!`)
    message.channel.send({embed: e})
      return
    }
    
    if (x.has(`savas_${user.id}`) === true) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${user.tag}** adlı kullanıcıda zaten **${kilic[0]}** bulunuyor!!`)
    message.channel.send({embed: e})
      return
    }
    
    if (db.fetch(`para_${user.id}`) < 250) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${user.tag}** adlı kullanıcının sana verebileceği **250** RytCoini yok!`)
    message.channel.send({embed: e})
      return
    }
    
    db.set(`para_${user.id}`, db.fetch(`para_${user.id}`) - 250)
    db.add(`para_${message.author.id}`, 250)
    
    x.delete(`savas_${message.author.id}`)
    x.set(`savas_${user.id}`, "alındı")
    
     let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Başarıyla **${kilic[0]}** adlı ürün **${user.tag}** adlı kullanıcıya satıldı!`)
    message.channel.send({embed: e})
    return
  }
    
    if (olta.includes(a) === true) {
    
      if (x.has(`balık_${message.author.id}`) === false) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${olta[0]}** adlı ürün sende bulunmuyor nasıl satacaksın!`)
    message.channel.send({embed: e})
      return
    }
      
    if (x.has(`balık_${user.id}`) === true) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${user.tag}** adlı kullanıcıda zaten **${olta[0]}** bulunuyor!!`)
    message.channel.send({embed: e})
      return
    }
      
    if (db.fetch(`para_${user.id}`) < 100) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${user.tag}** adlı kullanıcının sana verebileceği **100** RytCoini yok!`)
    message.channel.send({embed: e})
      return
    }
    
    db.set(`para_${user.id}`, db.fetch(`para_${user.id}`) - 100)
    db.add(`para_${message.author.id}`, 100)
    
    x.delete(`balık_${message.author.id}`)
    x.set(`balık_${user.id}`, "alındı")
    
     let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Başarıyla **${olta[0]}** adlı ürün **${user.tag}** adlı kullanıcıya satıldı!`)
    message.channel.send({embed: e})
    return
  }
      if (kalem.includes(a) === true) {
    
    if (x.has(`kalem_${message.author.id}`) === false) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${kalem[0]}** adlı ürün sende bulunmuyor nasıl satacaksın!`)
    message.channel.send({embed: e})
      return
    }
    
    if (x.has(`kalem_${user.id}`) === true) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${user.tag}** adlı kullanıcıda zaten **${kalem[0]}** bulunuyor!!`)
    message.channel.send({embed: e})
      return
    }
    
    if (db.fetch(`para_${user.id}`) < 250) {
      let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${user.tag}** adlı kullanıcının sana verebileceği **250** RytCoini yok!`)
    message.channel.send({embed: e})
      return
    }
    
    db.set(`para_${user.id}`, db.fetch(`para_${user.id}`) - 250)
    db.add(`para_${message.author.id}`, 250)
    
    x.delete(`kalem_${message.author.id}`)
    x.set(`kalem_${user.id}`, "alındı")
    
     let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Başarıyla **${kalem[0]}** adlı ürün **${user.tag}** adlı kullanıcıya satıldı!`)
    message.channel.send({embed: e})
    return
  }
    return
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["shop"],
  permLevel: 0,
    kategori: "profil"
};

exports.help = {
  name: "sat",
  description: "Elinizdeki bir ürünü istediğiniz kişiye satarsınız.",
  usage: "sat [@kullanıcı] [ürün-adı/ürün-kodu/ürün-numarası]"
};