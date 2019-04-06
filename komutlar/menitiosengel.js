const db = require('quick.db')
const Discord = require('discord.js')


exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(`Aç yada kapat yazmalısın! Örnek: rb!everyone-engelleme aç`)
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
  
  if (args[0] == 'aç') {
    var i = await db.set(`ever_${message.guild.id}`, 'acik')
      message.channel.send(':white_check_mark: Everyone Engel başarıyla açıldı! Üyeleri Yasakla yetkisine sahip olanların everyone engellenmicektir.')
    
  }
  if (args[0] == 'kapat') {
    var i = await db.set(`ever_${message.guild.id}`, 'kapali')
      message.channel.send(':white_check_mark: Everyone Engel başarıyla kapatıldı! Artık herkes everyone yazabilir.')
    
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['everyone',],
  permLevel: 4,
  kategori: 'ayarlar'
};

exports.help = {
  name: 'everyone-engelleme',
  description: 'Atılan Menitiosları Engellemeyi Sağlar',
  usage: 'everyone'
};

