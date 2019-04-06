const Discord = require('discord.js');
const db = require("quick.db");

exports.run = (client, message, args, dil, dill) => {
      
      let sebep = args.slice(0).join(" ");
      if (!sebep) {
        if (dill === 'tr') {
          let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription('AFK olma nedenini yazmalısın!')
           message.channel.send({embed: embed})
        }
        if (dill === 'en') {
          let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription('You should write why you are AFK!')
           message.channel.send({embed: embed})
        }
        return
      }
  
      db.set(`afks_${message.author.id}`, sebep)
  
  if (dill === 'tr') {
    message.reply(`artık **${sebep}** sebebi ile AFK modundasın!`)
  }
  
  if (dill === 'en') {
    message.reply(`You are now in AFK mode because of **${sebep}**!`)
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'afk',
  description: 'AFK olursunuz. (Birisi sizi etiketlediğinde AFK olduğunuzu söyler.)',
  usage: 'afk [sebep]'
};
