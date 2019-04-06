const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

exports.run = async (bot, message, args) => {
  
  var m = await message.channel.send(`<a:botloading:556372508207742977> Gerekli veriler hesaplanırken lütfen bekleyin...`)
  
  var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();
  
    //--------------------------//
  
    var osBit = await os.arch();
  
    if (osBit === 'x64') osBit = '64 Bit'
    else if (osBit === 'x82') osBit = '32 Bit'
    else osBit = os.arch();
  
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(' D [gün], H [saat], m [dakika], s [saniye]');
      
      setTimeout(() => {
        const s = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${bot.user.username} - İstatistikler`, bot.user.avatarURL)
        .addField("Gecikme Süreleri", `Mesaj Gecikmesi: ${new Date().getTime() - message.createdTimestamp} milisaniye \nBot Gecikmesi: ${bot.ping} milisaniye`, true)
        .addField("Çalışma Süresi/Açık Kalma Süresi", `${duration}`, true)
        .addField("Genel Veriler", stripIndents`
        **Müzik Çalan Sunucu Sayısı:** ${bot.voiceConnections.size.toLocaleString()}
        **Kullanıcı Sayısı:** ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
        **Sunucu Sayısı:** ${bot.guilds.size.toLocaleString()}
        **Kanal Sayısı:** ${bot.channels.size.toLocaleString()}
        `, true)
        .addField("Versiyonlar", stripIndents`
        **Discord.JS:** v${Discord.version}
        **Node.JS:** ${process.version}
        `, true)
        .addField("Kullanılan Bellek Boyutu", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`, true)
        .addField("İşletim Sistemi", `${osType} ${osBit}`, true)
        .addField("İşlemci Kullanımı", `%${percent.toFixed(2)}`, true)
        .addField("İşlemci", `\`\`\`diff\n- ${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``)
        return m.edit(s)
        
        }, 3000)
        
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['i', 'stat', 'istatistikler', 'stats'],
    permLevel: 0,
    kategori: "bot"
  };
  
  exports.help = {
    name: 'istatistik',
    description: 'Botun istatistiklerini gösterir.',
    usage: ''
  };