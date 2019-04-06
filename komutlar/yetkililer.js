const Discord = require('discord.js');

exports.run = async (client, message) => {
 
  var str = `**${message.guild.name} - Sunucu Yetkilileri** \n`
for(var i = 0; i < message.guild.members.size; i++) {
   if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "dnd" && !message.guild.members.array()[i].user.bot) {
      str += `${client.emojis.get('466955726674460673')} ${message.guild.members.array()[i].user.tag}\n`
    }
    else if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "online" && !message.guild.members.array()[i].user.bot){
      str += `${client.emojis.get('479282209401077780')} ${message.guild.members.array()[i].user.tag}\n`
    }
    else if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "idle" && !message.guild.members.array()[i].user.bot){
      str += `${client.emojis.get('508729484128813101')} ${message.guild.members.array()[i].user.tag}\n`
    }
      else if (message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "offline" && !message.guild.members.array()[i].user.bot){
      str += `${client.emojis.get('508729501027401734')} ${message.guild.members.array()[i].user.tag}\n`
    }
}

  message.channel.send(str.replace(message.guild.owner.user.tag, `${client.emojis.get("508731066358693899")} **${message.guild.owner.user.tag}**`))
  message.channel.sendCode('markdown', '# Bu komut sunucudaki "Mesajları Yönet" iznine/yetkisine sahip kullanıcıları gösterir.')
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili-listesi', 'sunucu-yetkilileri', 'moderatorler', 'modlar', 'moderatörler', 'staffs'],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: 'yetkililer',
  category: 'sunucu',
  description: 'Bulunduğunuz sunucudaki yetkilileri çevrimiçi, çevrımdışı/görünmez, rahatsız etmeyin ve boşta modlarında olup olmadıklarını göstererek listeler. \n(Mesajları Yönet yetkisine sahip kullanıcıları yetkili olarak sayar.)',
  usage: ''
};