const Discord = require('discord.js');

exports.run = (client, message, args) => {
    
    let user = message.mentions.users.first() || message.author
    
    const avatar = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(`[Avatar URL](${user.avatarURL})`)
        .setImage(user.avatarURL)
    message.channel.send(avatar)
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["pp"],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'avatar',
  description: 'Avatarınızı gösterir.',
  usage: 'avatar [@kullanıcı]'
};