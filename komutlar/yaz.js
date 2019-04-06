const Discord = require('discord.js');
const db = require("quick.db");
exports.run = async (client, message, args, dil, dill) => {
  
  let x = new db.table('market');
  
  if (x.has(`kalem_${message.author.id}`) === false) {
    if (dill === 'tr') {
    const embe = new Discord.RichEmbed()
		.setDescription(dil.market.err.replace("{ürün}", "kalem").replace("{ürün}", "kalem").replace("{prefix}", client.ayarlar.prefix))
		.setColor('RANDOM')
		message.channel.send({embed: embe});
    }
    if (dill === 'en') {
    const embe = new Discord.RichEmbed()
		.setDescription(dil.market.err.replace("{ürün}", "pencil").replace("{ürün}", "pencil").replace("{prefix}", client.ayarlar.prefix))
		.setColor('RANDOM')
		message.channel.send({embed: embe});
    }
    return
  }
  
  let user = message.mentions.users.first();
  if (!user) return message.reply('Bir kişiyi etiketlemelisin!');
  
  if (user.bot === true) return message.reply('Bir insanı etiketle bot değil!');
  
  let mesaj = args.slice(1).join(' ');
  if (!mesaj) return message.reply('Yazılmasını istediğin yazıyı yazmalısın!');
  if (mesaj.includes("@everyone")) return message.reply('Yo yo yo `@everyone` etiketi attıramazsın!');
  if (mesaj.includes("@here")) return message.reply('Yo yo yo `@here` etiketi attıramazsın!');
  
  let l = /(mal|m a l|ma l|m al|amk|sg|oç|sik|amına|amın|orospu|orospo|çocuğu|orosbu|orosbo|cocugu)/
  if (mesaj.match(l)) return message.reply('Yo yo yo attıracağın mesaj küfür barındıramaz!');
  
  message.delete();
  
  try {
  
  message.channel.createWebhook(user.username, user.avatarURL) //make the webhook with the authors name and avatar
    .then(wb => {
        const w = new Discord.WebhookClient(wb.id, wb.token) //get the webhook
        w.send(mesaj); //send the msg
        w.delete() //delete the webhook
    })
    
  } catch (err) {
  
    message.channel.send(`**Hata:** \n\`\`\`js\n${err}\n\`\`\``);
    
  };
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['say', 'webhook', 'yaz'],
  permLevel: 0,
    kategori: "eğlence",
  //aktifmi: false
};

exports.help = {
  name: 'yazdır',
  description: 'İstediğiniz yazıyı bota webhook ile etiketlenen kullanıcının ağzından yazdırır.',
  usage: 'yazdır [@kullanıcı] [yazı]'
};
