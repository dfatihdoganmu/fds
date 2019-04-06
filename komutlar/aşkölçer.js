const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('snekfetch');

exports.run = async (client, message, args, dil, dill) => {
  
  if (dill === 'tr') {
  var y1 = "Biraz daha uğraşırsan bu iş olacak gibi :)"
  var y2 = "Eh biraz bir şeyler var gibi."
  var y3 = "Azıcıkta olsa bir şeyler hissediyor sana :)"
  var y4 = "Bu iş olmaz sen bunu unut."
  var y = "Sizi evlendirelim <3"
  }
  if (dill === 'en') {
    var y1 = "If you deal a little more like this will work :)"
    var y2 = "Well a bit like a little something there."
    var y3= "It feels a little bit of things though :)"
    var y4 = "This won't work, you forget it."
    var y = "Let us marry you <3"
  }
 
        let member = message.guild.member(message.mentions.users.array()[0] || message.guild.members.get(args[0]))
        let member2 = message.guild.member(message.mentions.users.array()[1] || message.guild.members.get(args[1]))
        var s = message.author
        if(member2) {
                var s = member2.user
        }
        if(!member) {
                const embed = new Discord.RichEmbed()
                        .setDescription(dil.user)
                        .setColor("RANDOM")
                message.channel.send({embed})
                return
        }
 
        var anasonuc = Math.floor(Math.random() * 101)
        var kalp = ''
        var akalp = ''
        if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
                var c = 0
                for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
                        kalp += '❤️'
                        c++
                }
                for(var x = c; x < 10; x++) {
                        akalp += `🖤`
                }
        } else {
                var kalp = '🖤'
                var akalp = '🖤🖤🖤🖤🖤🖤🖤🖤🖤'
        }
  var yorum = y
        if(anasonuc < 80) {
                var yorum = y1
        }
        if(anasonuc < 60) {
                var yorum = y2
        }
        if(anasonuc < 40) {
                var yorum = y3
        }
        if(anasonuc < 20) {
                var yorum = y4
        }
  
  const canvas = Canvas.createCanvas(310, 160);
  const ctx = canvas.getContext('2d');

  const {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.glitch.com/eaf5e667-49aa-46e2-a69e-6b392fbb476b%2Fa%C5%9FkolcerBosArkaplan.png?1531641809728");
  const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const { body: buffer } = await snekfetch.get(s.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 28, 28, 60, 60);

  const { body: mentionedBuffer } = await snekfetch.get(member.user.displayAvatarURL);
  const mentionedAvatar = await Canvas.loadImage(mentionedBuffer);
  ctx.drawImage(mentionedAvatar, 224, 28, 60, 60);

  ctx.fillStyle = "red";
  ctx.fillRect(58, 115, anasonuc / 100 * 197, 26);
  
  ctx.fillStyle = "black"
  ctx.font = '20px serif';
  ctx.fillText(`${anasonuc}%`, 137, 137, 37);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "aşkölçer.png");
  
        const embed = new Discord.RichEmbed()
                .setAuthor(`${member.user.tag} ${dil.ve} ${s.tag}`)
                .setDescription(`${dil.ask.yuzde} **%${anasonuc}**! \n${kalp}${akalp} \n\n${yorum}`)
                .setColor("RANDOM")
        message.channel.send({embed})
  message.channel.send({file: attachment})
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["aşk", "love", "love-meter"],
  permLevel: 0,
    kategori: "eğlence"
};

exports.help = {
  name: 'aşk-ölçer',
  description: 'İki kullanıcı arasındaki aşkı ölçer.',
  usage: 'aşk-ölçer [@kullanıcı] [<@kullanıcı>]'
};