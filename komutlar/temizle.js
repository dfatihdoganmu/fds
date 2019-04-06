const Discord = require('discord.js');
//const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
 //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  var x = args[0]
  
  if (!x) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
  
  if (isNaN(x)) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
  
  if (x < 1) return message.reply("**1** adetten az mesaj silemem!")
  if (x > 100) return message.reply("**100**den fazla mesaj silemem!")
  
  message.channel.bulkDelete(x)
  
  try {
  
 /* let xx = eval(x+'/100'); 
  let a = []; 
  for (var i = 0; i < x; i++) { 
    a.push('100') 
  }; 
  
  for(var y = 0; y < a.length; y++) {
    message.channel.bulkDelete(100)
  }*/
} catch(err) {
message.channel.send("`14` günden önceki mesajları silemem!")
}
  
  message.channel.send(`**${x}** adet mesaj başarıyla silindi!`).then(msg => {
	msg.delete(3000)
  })
  
	message.delete();
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil", "mesaj-sil", "mesajları-sil"],
  permLevel: 1,
    kategori: "moderasyon"
};

exports.help = {
  name: 'temizle',
  category: 'moderasyon',
  description: 'Belirtilen miktarda mesaj siler.',
  usage: 'temizle [miktar]'
};