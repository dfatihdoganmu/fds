const Discord = require('discord.js');
const request = require('node-superfetch');
const jimp = require('jimp');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
const Canvas = require('canvas')

const db = require('quick.db');

const ark = ["renk", "color"]
const arm = ["resim", "image"]
const reset = ['sıfırla', 'reset']
const saydam = ['saydamlaştır', 'saydam']
const award = ['ödül', 'ödüller', 'award', 'reward', 'prize']

exports.run = async (client, msg, args) => {
  
  var u = msg.mentions.users.first() || msg.author;
  
  const message = msg
  
  
  if(ark.includes(args[0])) {
    if(reset.includes(args[1])) {
    if (db.has(`${u.id}.renk`) === false) {
    const embed = new Discord.RichEmbed()
				.setDescription("Renk ayarlı değil nasıl sıfırlanacak!")
				.setColor("RANDOM")
			msg.channel.send({embed})
			return
    }
      db.delete(`${u.id}.renk`)
			const embed = new Discord.RichEmbed()
				.setDescription("Renk başarıyla sıfırlandı!")
				.setColor("RANDOM")
			msg.channel.send({embed})
			return
		}
		if(!args[1]) {
			const embed = new Discord.RichEmbed()
				.setDescription("Bir renk kodu veya `sıfırla` yazmalısın!")
                .setFooter("Başına # koymayınız!")
				.setColor("RANDOM")
			msg.channel.send({embed})
			return
		}
		if(args[1].length !== 6) {
			const embed = new Discord.RichEmbed()
				.setDescription("Renk kodları 6 hane olur!")
                .setFooter("Başına # koymayınız!")
				.setColor("RANDOM")
			msg.channel.send({embed})
			return
		}
			
    db.set(`${u.id}.renk`, args[1])
    
		var canvas = Canvas.createCanvas(150, 150)
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = `#${args[1]}`;
		ctx.fill()
		ctx.fillRect(0, 0, 150, 150)
		const embed = new Discord.RichEmbed()
			.setAuthor("Ayarlanan Renk: #{renk}".replace("{renk}", args[1].toUpperCase()))
			.setImage(`attachment://renk.png`)
			.setColor("RANDOM")
		msg.channel.send({embed, files:[{attachment:canvas.toBuffer(),name:"renk.png"}]})
		return
	}
	if(arm.includes(args[0])) {
		if(reset.includes(args[1])) {
			if(db.has(`${u.id}.resim`) === false) {
				const embed = new Discord.RichEmbed()
					.setDescription("Ayarlı bir resim yok neyi sıfırlayacaksın!")
					.setColor("RANDOM")
				msg.channel.send({embed})
				return
			}
			
      db.delete(`${u.id}.resim`)
      
			const embed = new Discord.RichEmbed()
				.setDescription("Resim başarıyla sıfırlandı!")
				.setColor("RANDOM")
			msg.channel.send({embed})
			return
		}
		if(!args[1]) {
			const embed = new Discord.RichEmbed()
				.setDescription("Ayarlamak istediğiniz resmin linkini veya `sıfırla` yazınız!")
                .setFooter("NOT: Resim linki http veya https ile başlamalı!")
				.setColor("RANDOM")
			msg.channel.send({embed})
			return
		}
		if(!args[1].startsWith('http')) {
			const embed = new Discord.RichEmbed()
				.setDescription("Resim linki http veya https ile başlamalı!")
				.setColor("RANDOM")
			msg.channel.send({embed})
			return
		}

	    db.set(`${u.id}.resim`, args[1])

		const embed = new Discord.RichEmbed()
			.setAuthor("Resim başarıyla ayarlandı!")
			.setImage(args[1])
			.setColor("RANDOM")
		msg.channel.send({embed})
		return
	}

	if(u.bot === true) {
		const embed = new Discord.RichEmbed()
			.setDescription("Botların seviye veya XP bilgileri olamaz!")
			.setColor("RANDOM")
		msg.channel.send(embed)
		return
	}
  
	var sira = ''
	const sorted = message.guild.members.filter(m=>!m.user.bot).array().sort((a, b) => { return (db.fetch(`${b.user.id}.${msg.guild.id}.lvll`) || 0) - (db.fetch(`${a.user.id}.${msg.guild.id}.lvll`) || 0) });
	const top10 = sorted.splice(0, message.guild.members.size)
	const mappedID = top10.map(s => s.user.id);
	for(var i = 0; i < message.guild.members.size; i++) {
		if(mappedID[i] === u.id) {
			sira += `#${i+1}   `
		}
  }

	let Image = Canvas.Image;
	var canvas = Canvas.createCanvas(934, 282);
	var ctx = canvas.getContext('2d');

var opacity = 1;

let urlBG = db.fetch(`${u.id}.resim`);
let url = u.displayAvatarURL;

jimp.read(url, (err, ava) => {
	if (err) return console.log(err);
	ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
		if (err) return console.log(err);
      
      if (db.fetch(`${u.id}.resim`) == "" || db.fetch(`${u.id}.resim`) == null) {
        urlBG = "https://static.tildacdn.com/tild3166-3465-4533-b163-323762393762/-/empty/database1.png";
      }
    
		jimp.read(urlBG, (err, imageBG) => {
			if (err) return console.log(err);
			imageBG.getBuffer(jimp.MIME_PNG, (err, bufBG) => {
				if (err) return console.log(err);

				let Avatar = Canvas.Image;
				let ava = new Avatar;
				ava.src = buf;

				let Background = Canvas.Image;
				let bg = new Background;
				bg.src = bufBG;

			  if (db.fetch(`${u.id}.resim`) === "" || db.fetch(`${u.id}.resim`) === null || db.has(`${u.id}.resim`) === false) {
					opacity = 1;
				} else {
					ctx.drawImage(bg, 0, 0, 934, 282); 
					opacity = 0.75;
				}

				ctx.globalAlpha = opacity;
				ctx.fillStyle = "#2f3136";
				ctx.fillRect(0, 0, 934, 282);
				ctx.fillStyle = "#000";
				ctx.fillRect(25, 40, 885, 210);
				ctx.globalAlpha = 1;

				ctx.font = "italic 36px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        ctx.fillText(`${u.username}`, 264, 164);
        //ctx.font = "26px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "center";
        ctx.fillText(`#${u.discriminator}`, ctx.measureText(`${u.username}`).width + 10 + 316, 164);
				
				/*Seviye*/
				var lvl = db.fetch(`${u.id}.${msg.guild.id}.lvll`) || 0

				ctx.fillStyle = db.has(`${u.id}.renk`) ? "#"+db.fetch(`${u.id}.renk`) : "#00ffbb";
				ctx.textAlign = "end";
				ctx.font = "bold 36px Arial";
				ctx.fillText(lvl, 934 - 64, 82);
				ctx.font = "26px Arial";
				ctx.fillText("Seviye", 934 - 64 - ctx.measureText(lvl).width - 16, 82);

				/*Sıralama*/
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "end";
        ctx.font = "bold 36px Arial";
        ctx.fillText(sira, 994 - 64 - ctx.measureText(lvl).width - 16 - ctx.measureText(`Seviye`).width - 16, 82);
        ctx.font = "26px Arial";
        ctx.fillText("Sıralama", 934 - 64 - ctx.measureText(lvl).width - 16 - ctx.measureText(`Seviye`).width - 16 - ctx.measureText(sira).width - 16, 82);
          
				/*XP*/
				var xp = db.fetch(`${u.id}.${msg.guild.id}.xpp`) || 0;

        var zz = db.has(`${u.id}.${msg.guild.id}.lvll`) ? db.fetch(`${u.id}.${msg.guild.id}.lvll`) * 100 : 100;
        
				 ctx.font = "26px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.textAlign = "start";
          ctx.fillText("/ " + zz + " XP", 730 + ctx.measureText(xp).width + 10, 164);
          ctx.fillStyle = "#fff";
          ctx.fillText(xp, 730, 164);
        
				ctx.beginPath();
				ctx.fillStyle = "#424751";
				ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
				ctx.fill();
				ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
				ctx.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
				ctx.fill();
        
         if (xp > 615 - 18.5) xp = 615 - 18.5;
        
				ctx.beginPath();
        ctx.fillStyle = db.has(`${u.id}.renk`) ? "#"+db.fetch(`${u.id}.renk`) : "#00ffbb";
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.25, xp, 37.5);
        ctx.arc(257 + 18.5 + xp, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();

				const Durum = u.presence.status;
        var Durmm = ''

				if (Durum === 'online') { var Durmm = 'green' }
				if (Durum === 'offline') { var Durmm = 'grey' }
				if (Durum === 'dnd') { var Durmm = 'red' }
				if (Durum === 'idle') { var Durmm = 'yellow' }

				ctx.beginPath();
				ctx.lineWidth = 8;
				ctx.arc(85 + 75, 66 + 75, 75, 0, 2 * Math.PI, false);
				ctx.strokeStyle = Durmm;
				ctx.stroke();
				ctx.clip();
				ctx.drawImage(ava, 85, 66, 150, 150);

				message.channel.send({
					files: [{
						attachment: canvas.toBuffer(),
						name: 'seviye.png'
					}]
				});
			});
		});
	});
});
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["level", "rank", "xp", "puan"],
  permLevel: 0,
    kategori: "lvl"
};

exports.help = {
  name: 'seviye',
  description: 'Seviyenizi ve XP\'nizi gösterir.',
  usage: 'seviye [<@kullanıcı/renk/resim>] [renk kodu/resim URLsi/sıfırla]'
};