const Discord = require ('discord.js');
module.exports.run = async (bot, message, args) => {
    var user = message.mentions.users.first() || message.author;
    if (!args[0]) return message.channel.send("Müzik dinleyen birisini etiketle.")
  
    if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
        try {
            var trackImg = user.presence.game.assets.largeImageURL;
            var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
            var trackName = user.presence.game.details;
            var trackAlbum = user.presence.game.assets.largeText;
            var trackAuthor = user.presence.game.state;

            const embed = new Discord.RichEmbed()
                .setAuthor('Spotify Şarkı Bilgisi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2000px-Spotify_logo_without_text.svg.png')
                .setColor(0xdb954)
                .setThumbnail(trackImg)
                .setFooter(`Rahatsız Bot.`, bot.user.avatarURL)
                .setDescription(`
\ **Şarkı ismi**:  \`${trackName}\`
\ **Albüm**:  \`${trackAlbum}\`
\ **Sanatçı**:  \`${trackAuthor}\`
`)
                .addField('Şarkı linki :', `[${trackUrl}](${trackUrl})`, false);
                
            return message.channel.send(embed);

        } catch (error) {
            return message.channel.send(` **${user.tag}** geçerli bir şarkı dinlemiyor.`);
        }

    } else {
        return message.channel.send(`**${user.tag}**, Spotify kullanmıyor.`);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s',],
  permLevel: 0,
  kategori: 'arama'
};

exports.help = {
  name: 'spotify',
  description: 'Etiketlediğiniz Kullanıcının Dinlediği Müziğin Bilgilerini Gösterir.',
  usage: 'spotify'
};