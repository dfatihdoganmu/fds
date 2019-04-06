const Discord = require('discord.js');
const fortnite = require('fortnitetracker-7days-stats');

exports.run = (client, message, args, dil, dill) => {
  
    if(args.length < 1){
        message.reply(dil.userName);
        return;
    }

  var name = args.slice(0).join(' ');
  
    var url = "https://fortnitetracker.com/profile/pc"
                                + encodeURIComponent(name);
    message.channel.startTyping();

    fortnite.getStats(name, "pc", (err, result) => {
        if(err){
            message.reply(dil.dont);
            message.channel.stopTyping();
            return;
        }
      
        var embed = new Discord.RichEmbed()
            .setAuthor(result.accountName, "", url)
            .setDescription('')
            .addField(dil.fortnite.maclar, result.wins)
            .addField(dil.fortnite.oyun, result.matches)
            .addField(dil.fortnite.oran, ~~result.wr + "%")
            .addField(dil.fortnite.kill, + result.kills)
            .addField(dil.fortnite.kd, + result.kd)
            .setColor("RANDOM")
            .setURL(url)
            .setThumbnail(result.skinUrl);

        message.channel.stopTyping();
        message.channel.send(embed);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fortnite-istatistik'],
  permLevel: 0,
    kategori: "arama"
};

exports.help = {
  name: 'fortnite',
  description: 'İstediğiniz bir fortnite kullanıcısının istatistiklerini gösterir.',
  usage: 'fortnite pc [fortnite kullanıcı adı]'
};
