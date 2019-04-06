const Discord = require('discord.js');
const hastebin = require('hastebin-gen');

exports.run = async (client, message) => {
  
   hastebin(
client.guilds.sort((a,b)=>a.memberCount-b.memberCount).array().reverse().map(m => `# ${m.name} ✦ ${m.members.size} Kullanıcı`).join(`\n`), "md").then(r => {
     var embed = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setDescription(`Sunucu listesi fazla uzun olduğu için hastebine yüklendi! \n[Buraya tıklayarak](${r}) ulaşabilirsiniz.`)
     message.channel.send(embed);
  }).catch(err => message.channel.send("Şuanda https://hastebin.com/about.md adresinde sorun bulunduğu için bu komut kullanılamıyor. Site düzeldiğinde komut çalışacaktır."))

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu-listesi'],
  permLevel: 0,
    kategori: "bot",
  category: "bot"
};

exports.help = {
  name: 'sunucular',
  description: 'Botun bulunduğu sunucuları gösterir.',
  usage: ''
};