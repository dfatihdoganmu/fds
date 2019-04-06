const Discord = require('discord.js');
var request = require('request');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyDSiyHBWZI9dDZBWXloNVhrHbpzTTfa0L8');

exports.run = async (client, message, args) => {
  
  let x = args.slice(0).join(' ')
  if (!x) {
    return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setDescription("Lütfen bir video ismi yazınız."))
  }
  
    var v = await youtube.searchVideos(x, 10)
    var video = await youtube.getVideoByID(v[0].id)  
      
    var song = {
    id: video.id,
    title: video.title,
    channel: video.channel.title,
    durationh: video.duration.hours || 0,
    durationm: video.duration.minutes || 0,
		durations: video.duration.seconds || 0,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    thumbnail: `https://img.youtube.com/vi/${video.id}/thumbnail.png`,
    };
  
  let y = ''
  if (song.durationh === 0) {
    y = `${song.durationm || 0}:${song.durations || 0}`
  } else {
    y = `${song.durationh || 0}:${song.duraitonm || 0}:${song.durations || 0}`
  }
  
request(`https://www.googleapis.com/youtube/v3/videos?id=${video.id}&key=AIzaSyDSiyHBWZI9dDZBWXloNVhrHbpzTTfa0L8&part=statistics`, function (error, response, body) {
    if (error) return message.channel.send('Hata:', error);
    else if (!error) {
      var genel = JSON.parse(body);
      //console.log(genel.items[0].statistics);
      let like = genel.items[0].statistics.likeCount
      let dislike = genel.items[0].statistics.dislikeCount
      let view = genel.items[0].statistics.viewCount
      let comment = genel.items[0].statistics.commentCount
    
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setAuthor(`Video Arama Sistemi`, `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`)
      .addField("İsim", song.title)
      .addField("Kanal", song.channel)
      .addField("Süre", y)
      .addField("Beğenme", like)
      .addField("Beğenmeme", dislike)
      .addField("İzlenme", view)
      .addField("Yorum", comment || 0)
      .setThumbnail(`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`)
      message.channel.send({embed: embed})
      
    }
});
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["video-ara", "videoara", "youtube", "youtube-ara", "youtubeara", "youtube-video-ara", "youtubevideoara"],
  permLevel: 0,
  kategori: "arama"
};

exports.help = {
  name: 'video',
  description: 'Yazdığınız video hakkında bilgi verir ve istatistiklerini gösterir.',
  usage: 'video [video adı]'
};
