const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription(`${message.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') ? message.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') : 'Bu sunucuda hiç rol bulunmuyor.'}`)
  return message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
    kategori: "sunucu"
};

exports.help = {
  name: 'roller',
  description: 'Bulunduğunuz sunucudaki rolleri gösterir.',
  usage: ''
};