const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  let invites = await message.guild.fetchInvites()
  invites = invites.array();
  
  let possibleinvites = [];
  invites.forEach(function(invites) {
    possibleinvites.push(`${invites.code} | ${invites.inviter.username} |  ${invites.uses}`)
  })
  
  const embed = new Discord.RichEmbed()
  .setAuthor(`${message.guild.name} adlı sunucunun davetleri`, message.guild.iconURL)
  .setColor("BLUE")
  .addField('Davet Kodu | Oluşturan | Kullanım', `\`\`\`${possibleinvites.join('\n')}\`\`\``)
  .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL) 
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: 'sunucu',
  description: 'Sunucudaki davetleri gösterir.',
  usage: 'davetler',
 
};