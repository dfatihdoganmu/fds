const Discord = require("discord.js");
const db = require("quick.db");
const { stripIndents } = require("common-tags");

let olta = ['olta', '1', 'cWZtP4ZQSA'];
let kilic = ['kılıç ve kalkan', 'kılıç', 'kalkan', '2', 'd60831GsUj'];
let kalem = ['kalem', '3', 'd60831GsUg'];

let genel = ['olta', '1', 'cWZtP4ZQSA', 'kılıç ve kalkan', 'kılıç', 'kalkan', '2', 'd60831GsUj', '3', 'd60831GsUg'];

exports.run = async (client, message, args) => {
  
  let o = args[0];
  let a = args[1];
  
  const x = new db.table('market');
  
  if (!o) {
  
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username} - ${exports.help.name.toProperCase()} Sistemi`, client.user.avatarURL)
  .setTitle("Ürünler:")
  .addField(":fishing_pole_and_fish: Olta", stripIndents`
  **Ürün Açıklaması:** \`balık-tut\` komutunu kullanmayı sağlar.
  **Fiyat:** \`100 RhtCoin\`
  **Ürün Kodu:** \`cWZtP4ZQSA\`
  **Ürün Numarası:** \`1\`
  **Sizde bulunuyor mu?** \`${x.has(`balık_${message.author.id}`) ? "Evet bulunuyor." : "Hayır bulunmuyor."}\`
  `)
  .addField("Kılıç Ve Kalkan", stripIndents`
  **Ürün Açıklaması:** \`savaş\` komutunu kullanmayı sağlar.
  **Fiyat:** \`250 RhtCoin\`
  **Ürün Kodu:** \`d60831GsUj\`
  **Ürün Numarası:** \`2\`
  **Sizde bulunuyor mu?** \`${x.has(`savas_${message.author.id}`) ? "Evet bulunuyor." : "Hayır bulunmuyor."}\`
  `)
    .addField(":pencil: Kalem", stripIndents`
  **Ürün Açıklaması:** \`yaz\` komutunu kullanmayı sağlar.
  **Fiyat:** \`250 RhtCoin\`
  **Ürün Kodu:** \`d60831GsUg\`
  **Ürün Numarası:** \`3\`
  **Sizde bulunuyor mu?** \`${x.has(`kalem_${message.author.id}`) ? "Evet bulunuyor." : "Hayır bulunmuyor."}\`
  `)
  .setFooter(`${client.ayarlar.prefix}market satın-al <ürün-adı/ürün-kodu/ürün-numarası> yazarak bir ürün satın alabilirsiniz.`)
  message.channel.send({embed: embed})
  return
}
  
  if (o === "satın-al" || o === "satınal") {
  
    if (!a) {
     let em = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setDescription("Lütfen bir ürünün adını (küçük harfler ile), kodunu veya numarasını yazınız.")
      message.channel.send({embed: em})
     return
  }
    
    if (!genel.includes(a)) {
     let em = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setDescription("Geçersiz ürün! Lütfen bir ürünün adını (küçük harfler ile), kodunu veya numarasını doğru şekilde yazınız.")
      message.channel.send({embed: em})
     return
  }
    
    if (kilic.includes(a) === true) {
    
    if (x.has(`savas_${message.author.id}`) === true) {
      let eee = new Discord.RichEmbed()
      .setColor("RANDOM")
     .setDescription("Senin kılıç ve kalkanın zaten bulunuyor!")
       message.channel.send({embed: eee})
      return
    }
    
    if (db.fetch(`para_${message.author.id}`) < 250) {
      let ee = new Discord.RichEmbed()
      .setColor("RANDOM")
     .setDescription("Senin **250** RhtCoin'in yok!")
       message.channel.send({embed: ee})
      return
    }
    
    x.set(`savas_${message.author.id}`, "alındı")
    db.set(`para_${message.author.id}`, db.fetch(`para_${message.author.id}`) - 250)
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
     .setDescription(`Kılıç ve Kalkan başarıyla satın alındı! Artık \`${client.ayarlar.prefix}savaş\` yazarak \`savaş\` komutunu kullanabilirsin!`)
     message.channel.send({embed: e})
    return
  }
  
  if (olta.includes(a) === true) {
    
    if (x.has(`balık_${message.author.id}`) === true) {
      let eee = new Discord.RichEmbed()
      .setColor("RANDOM")
     .setDescription("Senin oltan zaten bulunuyor!")
       message.channel.send({embed: eee})
      return
    }
    
    if (db.fetch(`para_${message.author.id}`) < 100) {
      let ee = new Discord.RichEmbed()
      .setColor("RANDOM")
     .setDescription("Senin **100** RytCoin'in yok!")
       message.channel.send({embed: ee})
      return
    }
    
    x.set(`balık_${message.author.id}`, "alındı")
    db.set(`para_${message.author.id}`, db.fetch(`para_${message.author.id}`) - 100)
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
     .setDescription(`Olta başarıyla satın alındı! Artık \`${client.ayarlar.prefix}balık-tut\` yazarak \`balık-tut\` komutunu kullanabilirsin!`)
     message.channel.send({embed: e})
    return
  }
        if (kalem.includes(a) === true) {
    
    if (x.has(`kalem_${message.author.id}`) === true) {
      let eee = new Discord.RichEmbed()
      .setColor("RANDOM")
     .setDescription("Senin kalem in zaten bulunuyor!")
       message.channel.send({embed: eee})
      return
    }
    
    if (db.fetch(`para_${message.author.id}`) < 250) {
      let ee = new Discord.RichEmbed()
      .setColor("RANDOM")
     .setDescription("Senin **250** RhtCoin'in yok!")
       message.channel.send({embed: ee})
      return
    }
    
    x.set(`kalem_${message.author.id}`, "alındı")
    db.set(`para_${message.author.id}`, db.fetch(`para_${message.author.id}`) - 250)
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
     .setDescription(`Kalem başarıyla satın alındı! Artık \`${client.ayarlar.prefix}savaş\` yazarak \`yaz \` komutunu kullanabilirsin!`)
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
  name: "market",
  description: "Marketi gösterir.",
  usage: "market [<satın-al>] [<ürün-adı/ürün-kodu/ürün-numarası>]"
};