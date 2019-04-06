const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message, args, dil, dill) => {
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription(`${message.guild.emojis.map(e=>e.toString()).join(" **|** ") ? message.guild.emojis.map(e=>e.toString()).join(" **|** ") : dil.dont}`)
  return message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emojis'],
  permLevel: 0,
    kategori: "sunucu",
  category: 'server'
};

exports.help = {
  name: 'emojiler',
  description: 'Bulunduğunuz sunucudaki emojileri gösterir.',
  usage: ''
};