const Discord = require('discord.js');
const client = new Discord.Client();
const {RichEmbed} = require('discord.js');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require('chalk');
const fs = require('fs');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const db = require('quick.db');
const snekfetch = require('snekfetch');
const hastebin = require('hastebin-gen');
const Jimp = require("jimp");
const useful = require('useful-tools');
const request = require('node-superfetch');
const talkedRecently = new Set();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const ldb = low(adapter)

client.lowdb = ldb;
client.canvas = require('canvas'); 
client.veri = require('quick.db');
client.jimp = require('jimp');


client.config = require("./config.js");
require("./modules/functions.js")(client);

client.ayar = db;
let komutum = JSON.parse(fs.readFileSync("./komutlar.json", "utf8"));
client.cmdd = komutum

client.ayarlar = {
        "sahip": ["444009349166137344","514423830052077569","463419656661762048"],
        "web": "https://rahatsizbot.glitch.me/",
        "prefix": "rb!",
        "destek": "https://discord.gg/dVtWrY5",
  "dbl": "https://discordbots.org/bot/444200033781547028",
  "renk": "RANDOM"
};

client.tr = require('./tr.js');
client.en = require('./en.js');

client.on("ready", async () => {
  
  try {
  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
  require("./modules/dashboard.js")(client); 
  
  console.log(`${chalk.green(client.user.username)}${chalk.red(",")} ${chalk.blue(client.guilds.size)} ${chalk.yellow("Sunucu'ya")} ${chalk.red("ve")} ${chalk.blue(client.users.size.toLocaleString())} ${chalk.yellow("Kullanıcı'ya")} ${chalk.red("hizmet veriyor!")}`)
  client.user.setStatus("dnd");
    client.user.setActivity(`Ayarlar Sıfırlandı Dashboarddan Tekrar Yapabilirsiniz.`, { type: 'WATCHING' });
  //client.user.setActivity(`${client.ayarlar.prefix}yardım | ${client.ayarlar.prefix}davet | ${client.guilds.size} sunucu | Ayarlar Sıfırlandı`, { type: 'WATCHING' });
  } catch (err) { return }
});

client.on("message", async message => {
  
  if (!message.guild) return;

  let prefix;
  
if (db.has(`prefix_${message.guild.id}`) === true) {
  prefix = db.fetch(`prefix_${message.guild.id}`)
}
  
if (db.has(`prefix_${message.guild.id}`) === false) {
  prefix = client.ayarlar.prefix
}
   
 if (message.author.bot) return
	if (!message.content.startsWith(prefix)) return
	var command = message.content.split(" ")[0].slice(prefix.length)
	var args = message.content.split(" ").slice(1)
  
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  
  let dill = 'tr'
  if (db.has(`dil_${message.guild.id}`) === true) {
    dill = 'en'
  }
  var dil = client[dill]
  
  if (cmd) {
    
    if (!message.guild.members.get(client.user.id).hasPermission('EMBED_LINKS')) {
      message.channel.sendCode('markdown', "[Hata]: Botun yeterli yetkisi bulunmuyor! \n# Lütfen botun rolünün Gömülü Bağlantılar (Embed Links) iznine sahip olup olmadığını kontrol ediniz. \n> Eğer bu izne sahip değilse izni botun rolüne veriniz.")
    }
    
    if (db.has(`karalist_${message.author.id}`) === true) {
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Sen botun komutlarını kullanamazsın! Çünkü botun kara listesindesin!")
    message.channel.send({embed: embed})
    message.react("😡")
    return
  };
    
    if (cmd.conf.enabled === false) {
      const x = await client.fetchApplication()
			if (x.owner.id !== message.author.id) {
        const embed = new Discord.RichEmbed()
					.setDescription(`Bu komut şuanda sunucularda kullanıma kapalıdır! (Yapım aşamasındadır)`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
      }
    }
    
    if (cmd.conf.bakim === false) {
      const x = await client.fetchApplication()
			if (x.owner.id !== message.author.id) {
        const embed = new Discord.RichEmbed()
					.setDescription(`Bu komut bakımdadır.`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
      }
    }
    
    if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Mesajları Yönet iznine sahip olmalısın!`)
          .setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Üyeleri At iznine sahip olmalısın!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Üyeleri Yasakla iznine sahip olmalısın!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Yönetici iznine sahip olmalısın!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 'ozel') {
			if (message.member.id !== message.guild.owner.id) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu kullanabilmek için Sunucunun Sahibi olmalısın!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 5) {
			const x = await client.fetchApplication()
			if (x.owner.id !== message.author.id) {
				const embed = new Discord.RichEmbed()
					.setDescription(`Bu komutu sadece Bot Sahibi kullanabilir!`)
					.setColor("RANDOM")
				message.channel.send({embed})
				return
			}
		}
    
    cmd.run(client, message, args, dil, dill);
    
  }
  
});

client.on("message", async message => {
  
  if (!message.guild) return;
  
let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  
  if (message.author.bot) return;
  
 if (message.content === `<@${client.user.id}>`) {
    
    message.channel.send(`• Bu sunucuya ait ön-ek/prefix: \`${prefix}\` \n• Bu sunucuya ait yardım komutu: \`${prefix}yardım\``)
    
  }
  
  if (message.content === `<@${client.user.id}> ${message.content}`) {
    
    message.channel.send(`• Bu sunucuya ait ön-ek/prefix: \`${prefix}\` \n• Bu sunucuya ait yardım komutu: \`${prefix}yardım\``)
    
  }
  
});

client.on('messageReactionAdd', async (msgReact, user) => {
      if (user.bot === true) return;
  
     if (msgReact.message.id !== db.fetch(`oylamaM_${msgReact.message.guild.id}`)) return;
  
     if (msgReact.message.id === db.fetch(`oylamaM_${msgReact.message.guild.id}`)) {
  
        if (msgReact.emoji.name === "✅") {
        	
        db.add(`oylamaE_${msgReact.message.guild.id}`, 1)   
              
        }
  
        if (msgReact.emoji.name === "❌") {
          
          db.add(`oylamaH_${msgReact.message.guild.id}`, 1)
        
        }  
       
     }
});


//

client.on("message",async  message => {

  if (!message.guild) return;
  
let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;

  if(message.content.startsWith(prefix)) {
        let komutum = client.cmdd
        if(komutum[message.guild.id]) {
            for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
                if(message.content.slice(prefix.length) === Object.keys(komutum[message.guild.id][i])[0]) {
                   
                    message.channel.send(komutum[message.guild.id][i][Object.keys(komutum[message.guild.id][i])])
                  
                    return
                }
            }
        }
    }
  
  if (message.content === 'ağla' || message.content === "<@"+client.user.id+">"+" ağla") {
    message.reply("tamam. :sob:")
  }
  
});

let aa = []

client.on("message", async message => {
 // if (message.content === client.ayarlar.prefix+'başlat') {
  if (!message.guild) return
  if (message.guild.id === '476697907127648257') {
    if (message.channel.id === '515613522638405642') {
        aa.push(message.content)
         for (var i = 1; i < aa.length; i++) {
        if (aa[i+1] === message.content) {
          message.channel.overwritePermissions(message.author, {
            SEND_MESSAGES:false
          })
        }
         }
    } else {
      return
    }
  } else {
    return
 // }
  }
});



client.on("message", async message => {
  if(!message.author.bot) return;
  let sohbet = await db.fetch(`Usohbet_${message.channel.id}`)   
  if (!sohbet || sohbet === 'kapali') return; 
    else {
      message.delete(5000)
    }
});


client.on('guildCreate', async guild => {
   var konumlar = {
    "russia": "Rusya",
    "us-west": "Batı Amerika",
    "us-south": "Güney Amerika",
    "us-east": "Doğu Amerika",
    "us-central": "Amerika",
    "brazil": "Brezilya",
    "singapore": "Singapur",
    "sydney": "Sidney",
    "eu-west": "Batı Avrupa",
    "eu-south": "Güney Avrupa",
    "eu-east": "Doğu Avrupa",
    "eu-central": "Avrupa",
    "hongkong": "Hong Kong",
    "japan": "Japonya"
  };
  let channel = client.channels.get("518726714441072640")
  const server = new RichEmbed()
  .setColor('0x36393F')
  .setThumbnail(guild.iconURL || guild.defaultİconURL)
  .setTitle(`${guild.name} Adlı Sunucuya Eklendim!`, guild.iconURL || guild.defaultİconURL)
  .setDescription(`Toplam **${client.guilds.size}** sunucudayım!`)
  .addField(`» Sunucu Bilgileri:`, stripIndents`
   Sunucu Adı: _${guild.name}_
   Sunucu Kimliği/ID: _${guild.id}_
   Sunucunun Konumu: ${konumlar[guild.region]}
   Sunucu Sahibi: _${guild.owner.user.username}#${guild.owner.user.discriminator}_
   Sunucu Sahibi Kimliği/ID: _${guild.owner.user.id}_
   Sunucudaki Toplam Kullanıcı Sayısı: _${guild.members.size}_
   Sunucudaki İnsan Sayısı: _${guild.members.filter(m => !m.user.bot).size}_
   Sunucudaki Bot Sayısı: _${guild.members.filter(m => m.user.bot).size}_
  `)
  .setFooter(`${client.user.username} | Sunucu İzleyici`, client.user.avatarURL)
  channel.send(server);
  
  client.user.setActivity(`${client.user.username} | ${client.ayarlar.prefix}davet | ${client.guilds.size} sunucu`, {type:"WATCHING"})
})

client.on("guildDelete", async guild => {
  var konumlar = {
    "russia": "Rusya",
    "us-west": "Batı Amerika",
    "us-south": "Güney Amerika",
    "us-east": "Doğu Amerika",
    "us-central": "Amerika",
    "brazil": "Brezilya",
    "singapore": "Singapur",
    "sydney": "Sidney",
    "eu-west": "Batı Avrupa",
    "eu-south": "Güney Avrupa",
    "eu-east": "Doğu Avrupa",
    "eu-central": "Avrupa",
    "hongkong": "Hong Kong",
    "japan": "Japonya"
  };
  
let channel = client.channels.get("518726714441072640")
  const server = new RichEmbed()
  .setColor('0x36393F')
  .setThumbnail(guild.iconURL || guild.defaultİconURL)
  .setTitle(`${guild.name} Adlı Sunucudan Atıldım!`, guild.iconURL || guild.defaultİconURL)
  .setDescription(`Toplam **${client.guilds.size}** sunucudayım!`)
  .addField(`» Sunucu Bilgileri:`, stripIndents`
   Sunucu Adı: _${guild.name}_
   Sunucu Kimliği/ID: _${guild.id}_
   Sunucunun Konumu: ${konumlar[guild.region]}
   Sunucu Sahibi: _${guild.owner.user.username}#${guild.owner.user.discriminator}_
   Sunucu Sahibi Kimliği/ID: _${guild.owner.user.id}_
   Sunucudaki Toplam Kullanıcı Sayısı: _${guild.members.size}_
   Sunucudaki İnsan Sayısı: _${guild.members.filter(m => !m.user.bot).size}_
   Sunucudaki Bot Sayısı: _${guild.members.filter(m => m.user.bot).size}_
  `)
  .setFooter(`${client.user.username} | Sunucu İzleyici`, client.user.avatarURL)
  channel.send(server);
  
  client.user.setActivity(`${client.user.username} | ${client.ayarlar.prefix}davet | ${client.guilds.size} sunucu`, {type:"WATCHING"})
})

client.on("message", msg => {
  if (!msg.guild) return;
  
  if (db.has(`küfürE_${msg.guild.id}`) === false) return;
    if (db.has(`küfürE_${msg.guild.id}`) === true) {
  if (/(göt|amk|aq|orospu|oruspu|oç|oc|sik|fuck|yarrak|piç|amq|amcık|çocu|sex|seks|amına|sg|siktir git)/.test(msg.content)==true) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var k = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Küfür Engeli!")
        .setDescription(`Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`)
        msg.channel.send(k).then(message => message.delete(5000));
    }
}
    }

  if (db.has(`linkE_${msg.guild.id}`) === false) return;
    if (db.has(`linkE_${msg.guild.id}`) === true) {
    if (/(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/.test(msg.content)== true) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Link Engeli!")
        .setDescription(`Bu sunucuda linkler **${client.user.username}** tarafından engellenmektedir! Link atmana izin vermeyeceğim!`)
        msg.channel.send(e).then(message => message.delete(5000));
    }
}
    }
  
  if (db.has(`kFiltre_${msg.guild.id}`) === false) return;
    if (db.has(`kFiltre_${msg.guild.id}`) === true) {
  if (db.fetch(`kFiltre_${msg.guild.id}`).includes(msg.content)===true) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(`<@${msg.author.id}>`).then(message => message.delete(5000));
        var k = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Kelime Filtresi!")
        .setDescription(`Bu sunucuda **${msg.content}** kelimesi **${client.user.username}** tarafından engellenmek üzere filtreye alınmıştır!`)
        msg.channel.send(k).then(message => message.delete(5000));
    }
}
    }


});
client.canvas = require('canvas'); 
client.on('guildMemberAdd', async member => {
  const snekfetch = require('snekfetch')
  const Canvas = require('canvas')
  if(!db.has(`${member.guild.id}.karşılamaResmi`) || db.fetch(`${member.guild.id}.karşılamaResmi`) === 'varsayılan') {
    var canvas = Canvas.createCanvas(360, 100);
    const ctx = canvas.getContext('2d');
        const {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.discordapp.com/attachments/559106410747527168/559111738583285764/ReVa-hosgeldin.png");
      const background = await Canvas.loadImage( downloadedImageBuffer );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    /* ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip(); */

    const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
      const path = require('path')
    Canvas.registerFont('BebasNeueBold.ttf', { family: 'Bebas' })
    ctx.font=`36px Bebas`;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`${member.user.username.toUpperCase()}`, 110, 74);
    ctx.drawImage(avatar, 10, 5, 88, 88);
    const attachment = new Discord.Attachment(canvas.toBuffer(), "Rahatsız Bot-hosgeldin.png");
      if(db.has(`${member.guild.id}.girişçıkışKanalı`) === true) { member.guild.channels.get(db.fetch(`${member.guild.id}.girişçıkışKanalı`)).send(`**${member.guild.name}** sunucusuna hoş geldin ${member}!`, attachment) }
      if(member.user.bot) {
      var EndMS = 500;
          setTimeout(function(){ 
          }, 500);
          setTimeout(function(){
            if(db.has(`${member.guild.id}.girişçıkışKanalı`) === true) { member.guild.channels.get(db.fetch(`${member.guild.id}.girişçıkışKanalı`)).send(`:robot: **${member.user.username}** bir bot!`) }
        }, EndMS);
      }
  }
  if (db.fetch(`${member.guild.id}.karşılamaResmi`) === 'ara-cadde') {
    const Canvas = require('canvas')
  var canvas = Canvas.createCanvas(1023, 682);
  const ctx = canvas.getContext('2d');
      var {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.discordapp.com/attachments/555736907032821766/564041485029212160/aracadde-rahatszbot.png");
    const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  /* ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip(); */

  const { body: buffer } = await snekfetch.get(member.user.avatarURL);
  const avatar = await Canvas.loadImage(buffer);
    const path = require('path')
  Canvas.registerFont('BebasNeueBold.ttf', { family: 'Bebas' })
  ctx.font=`108px Bebas`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center"
  ctx.fillText(`${member.user.username.toUpperCase()}`, 505, 480);
  ctx.fillStyle = "#000000";
  const Durum = member.presence.status;
        var Durmm = ''

				if (Durum === 'online') { var Durmm = 'green' }
				if (Durum === 'offline') { var Durmm = 'grey' }
				if (Durum === 'dnd') { var Durmm = 'red' }
				if (Durum === 'idle') { var Durmm = 'yellow' }

				ctx.beginPath();
				ctx.lineWidth = 8;
				ctx.arc(406 + 100, 180 + 100, 100, 0, 2 * Math.PI, false);
				ctx.strokeStyle = Durmm;
				ctx.stroke();
				ctx.clip();
				ctx.drawImage(avatar, 406, 180, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "Rahatsız Bot-hosgeldin.png");
      if(db.has(`${member.guild.id}.girişçıkışKanalı`) === true) { member.guild.channels.get(db.fetch(`${member.guild.id}.girişçıkışKanalı`)).send(`**${member.guild.name}** sunucusuna hoş geldin ${member}!`, attachment) }
    if(member.user.bot) {
    var EndMS = 500;
        setTimeout(function(){ 
        }, 500);
        setTimeout(function(){
            if(db.has(`${member.guild.id}.girişçıkışKanalı`) === true) { member.guild.channels.get(db.fetch(`${member.guild.id}.girişçıkışKanalı`)).send(`:robot: **${member.user.username}** bir bot!`) }
      }, EndMS);
    }
  }
  })

client.on('guildMemberRemove', async member => {
  const snekfetch = require('snekfetch')
  const Canvas = require('canvas')
  if(!db.has(`${member.guild.id}.karşılamaResmi`) || db.fetch(`${member.guild.id}.karşılamaResmi`) === 'varsayılan') {
    var canvas = Canvas.createCanvas(360, 100);
    const ctx = canvas.getContext('2d');
      const {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.discordapp.com/attachments/559106410747527168/559111888097771531/ReVa-gorusuruz.png");
      const background = await Canvas.loadImage( downloadedImageBuffer );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    /* ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip(); */

    const { body: buffer } = await snekfetch.get(member.user.avatarURL);
    const avatar = await Canvas.loadImage(buffer);
      const path = require('path')
    Canvas.registerFont('BebasNeueBold.ttf', { family: 'Bebas' })
    ctx.font=`36px Bebas`;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`${member.user.username.toUpperCase()}`, 110, 74);
    ctx.drawImage(avatar, 10, 5, 88, 88);
    const attachment = new Discord.Attachment(canvas.toBuffer(), "Rahatsız Bot-gorusuruz.png");
      if(db.has(`${member.guild.id}.girişçıkışKanalı`) === true) { member.guild.channels.get(db.fetch(`${member.guild.id}.girişçıkışKanalı`)).send(`Görüşürüz; ${member.user.tag}`, attachment) }
  }
  if (db.fetch(`${member.guild.id}.karşılamaResmi`) === 'ara-cadde') {
    const Canvas = require('canvas')
  var canvas = Canvas.createCanvas(1023, 682);
  const ctx = canvas.getContext('2d');
      var {body: downloadedImageBuffer} = await snekfetch.get("https://cdn.discordapp.com/attachments/555736907032821766/564041476716232704/aracadde-rahatszbot-cks.png");
    const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  /* ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip(); */

  const { body: buffer } = await snekfetch.get(member.user.avatarURL);
  const avatar = await Canvas.loadImage(buffer);
    const path = require('path')
  Canvas.registerFont('BebasNeueBold.ttf', { family: 'Bebas' })
  ctx.font=`108px Bebas`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center"
  ctx.fillText(`${member.user.username.toUpperCase()}`, 505, 480);
  ctx.fillStyle = "#000000";
  const Durum = member.presence.status;
        var Durmm = ''

				if (Durum === 'online') { var Durmm = 'green' }
				if (Durum === 'offline') { var Durmm = 'grey' }
				if (Durum === 'dnd') { var Durmm = 'red' }
				if (Durum === 'idle') { var Durmm = 'yellow' }

				ctx.beginPath();
				ctx.lineWidth = 8;
				ctx.arc(406 + 100, 180 + 100, 100, 0, 2 * Math.PI, false);
				ctx.strokeStyle = Durmm;
				ctx.stroke();
				ctx.clip();
				ctx.drawImage(avatar, 406, 180, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "Rahatsız Bot-gorusuruz.png");
      if(db.has(`${member.guild.id}.girişçıkışKanalı`) === true) { member.guild.channels.get(db.fetch(`${member.guild.id}.girişçıkışKanalı`)).send(`Görüşürüz; ${member.user.tag}`, attachment) }

  }
})

client.on("messageDelete", message => {
  if(message.author.bot) return;
  db.set(`sonmesajicerik_${message.channel.id}`,message.content)
  db.set(`sonmesajsahipid_${message.channel.id}`,message.author.id)
  console.log('Sunucu:' + message.guild.name + 'Snipe: ' + message.content + ' ' + client.users.get(message.author.id).tag)
  });

client.on("guildMemberAdd", async member => {
    if (db.has(`sayac_${member.guild.id}`) === false) return
    if (db.has(`sKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`sKanal_${member.guild.id}`)
  let m = db.fetch(`sayacGM_${member.guild.id}`)
    member.guild.channels.get(channel).send(db.has(`sayacGM_${member.guild.id}`) ? m.replace("{kullanıcı}", member).replace("{hedef}", "\`"+db.fetch(`sayac_${member.guild.id}`)+"\`").replace("{üye}",  "\`"+db.fetch(`sayac_${member.guild.id}`) - member.guild.members.size+"\`") : `${member} Sunucuya katıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.members.size}\` üye kaldı! **rahatsizbot.glitch.me** adresinden veya (\`${client.ayarlar.prefix}sayaç-mesaj\` komutu ile mesajı değiştirilebilir.)`)
  
})

client.on("guildMemberRemove", async member => {
    if (db.has(`sayac_${member.guild.id}`) === false) return
    if (db.has(`sKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`sKanal_${member.guild.id}`)
   let m = db.fetch(`sayacCM_${member.guild.id}`)
    member.guild.channels.get(channel).send(db.has(`sayacCM_${member.guild.id}`) ? m.replace("{kullanıcı}", `**${member.user.tag}**`).replace("{hedef}", "\`"+db.fetch(`sayac_${member.guild.id}`)+"\`").replace("{üye}", "\`"+db.fetch(`sayac_${member.guild.id}`) - member.guild.members.size+"\`") : `**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.members.size}\` üye kaldı! **rahatsizbot.glitch.me** adresinden veya (\`${client.ayarlar.prefix}sayaç-mesaj\` komutu ile mesajı değiştirilebilir.)`)
})

client.on("message", async message => {
  
  if (!message.guild) return;
  
    if(db.has(`sayac_${message.guild.id}`) === true) {
        if(db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
            .setTitle(`Tebrikler ${message.guild.name}!`)
            .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
            .setColor("RANDOM")
            message.channel.send({embed})
            message.guild.owner.send({embed})
            db.delete(`sayac_${message.guild.id}`)
        }
    }
})

client.on("guildMemberAdd", member => {

  if (db.has(`otoR_${member.guild.id}`) === false) return;
  var rol = member.guild.roles.find(r => r.id === db.fetch(`otoR_${member.guild.id}`));
  if (!rol) return;
  
  member.addRole(rol)
  
  if (db.has(`otoRolK_${member.guild.id}`) === true) {
    member.guild.channels.get(db.fetch(`otoRolK_${member.guild.id}`)).send(`**${member.user.tag}** adlı kullanıcıya başarıyla otomatik rol olarak ayarlanmış olan **${rol.name}** adlı rol verildi!`)
  }
  
});

client.on("guildMemberAdd", async member => {
  if(db.has(`tag_${member.guild.id}`) === true) {
    member.setNickname(`${db.fetch(`tag_${member.guild.id}`)} ${member.user.username}`)
  }
  let kanal = member.guild.channels.get(db.fetch(`tagKanal_${member.guild.id}`));
  if(!kanal) return;
  if(db.has(`tagKanal_${member.guild.id}`) === true) {
      kanal.send(`**${member.user.tag}** adlı kullanıcıya \`${db.fetch(`tag_${member.guild.id}`)}\` olarak ayarlanmış olan tag verilerek kullanıcının ismi sunucu için \`${member.nickname || `${db.fetch(`tag_${member.guild.id}`)} ${member.user.username}`}\` olarak ayarlanmıştır!`)
    };
});
client.on("message", async msg => {
if (!msg.guild) return;

  if (msg.author.bot) return;
  
  if (db.has(`capsE_${msg.guild.id}`) === false) return;
  if (db.has(`capsE_${msg.guild.id}`) === true) {
    let x = /\w*[A-Z]\w*[A-Z]\w*/g;
    if (msg.content.match(x)) {
      if (msg.member.permissions.has("ADMINISTRATOR") === true) return;
      msg.delete();
      let y = await msg.reply(`Bu sunucuda büyük harf engeli açık, bu yüzden büyük harf açıkken yazı yazamazsın!`)
      y.delete(5000);
      return
    };
  };

});

client.on("guildMemberAdd", async member => {
  
  if (!member.guild) return;
  
  let prefix = await db.fetch(`prefix_${member.guild.id}`) || "rb!";
  
  if(db.has(`gc_${member.guild.id}`) === false) return;
  
  const hgK = member.guild.channels.get(db.fetch(`gc_${member.guild.id}`))
  if (!hgK) return;
  
  const giris = db.fetch(`girisM_${member.guild.id}`)
  
    hgK.send(db.has(`girisM_${member.guild.id}`) ? giris.replace('{kullanıcı}', `<@${member.user.id}>`).replace("{user}", `<@${member.user.id}>`).replace("{sunucu}", `**${member.guild.name}**`).replace("{kişisayısı}", `**${member.guild.members.size}**`) : `<@${member.user.id}> Katıldı! **rahatsizbot.glitch.me** adresinden veya (\`giriş-mesaj-ayarla\` komutu ile mesajı değiştirilebilir.)`);
});

client.on("guildMemberRemove", async member => {
  
  if (!member.guild) return;
  
  let prefix = await db.fetch(`prefix_${member.guild.id}`) || "rb!";
  
  if(db.has(`gc_${member.guild.id}`) === false) return;
  
  const hgK = member.guild.channels.get(db.fetch(`gc_${member.guild.id}`))
  if (!hgK) return;
  
  const cikis = db.fetch(`cikisM_${member.guild.id}`)
  
  hgK.send(db.has(`cikisM_${member.guild.id}`) ? cikis.replace('{kullanıcı}', `**${member.user.username}**`).replace("{user}", `**${member.user.username}**`).replace("{sunucu}", `**${member.guild.name}**`).replace("{kişisayısı}", `**${member.guild.members.size}**`) : `**${member.user.username}** Ayrıldı! **rahatsizbot.glitch.me** adresinden veya (\`çıkış-mesaj-ayarla\` komutu ile mesaj değiştirilebilir.)`);
});

client.on('message', async msg => {
  
  if (!msg.guild) return;
  
  let prefix = await db.fetch(`prefix_${msg.guild.id}`) || client.ayarlar.prefix;
  
  let rol = '';
  let kanal = '';
  
  if (db.has(`destekK_${msg.guild.id}`) === true) {
 kanal = msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`))
    if (kanal) {
      kanal = msg.guild.channels.get(db.fetch(`destekK_${msg.guild.id}`)).name
    }
  }
  
  if (db.has(`destekK_${msg.guild.id}`) === false) {
  kanal = "destek-kanalı"
  }
  
  if (db.has(`destekR_${msg.guild.id}`) === true) {
  rol = msg.guild.roles.get(db.fetch(`destekR_${msg.guild.id}`))
  }
  
  if (db.has(`destekR_${msg.guild.id}`) === false) {
  rol = msg.guild.roles.find(ro => ro.name === "Destek Ekibi")
  }
  
  const reason = msg.content.split(" ").slice(1).join(" ");
  if (msg.channel.name== kanal) {
     if (msg.author.bot) return;
    if (!rol) return msg.reply(`Lütfen \`Destek Ekibi\` isminde bir rol oluşturunuz veya \`${client.ayarlar.prefix}destek-rol-ayarla\` yazarak destek rolü ayarlayınız.`).then(m2 => {
            m2.delete(5000) })
    if (msg.guild.channels.find(c => c.name === `yardım-${msg.author.discriminator}`)) {
      
      msg.author.send(`Senin zaten **${msg.guild.name}** adlı sunucuda bir Destek Talebin bulunuyor! \nBulunan talep: <#${msg.guild.channels.find(c => c.name === `yardım-${msg.author.discriminator}`).id}>`)
      msg.guild.channels.find(c => c.name === `yardım-${msg.author.discriminator}`).send(`**${msg.author.tag}** adlı kullanıcı bu sunucuda zaten açık bir Destek Talebi (bu kanal) olduğu halde \`${msg.content}\` sebebi ile talep açmaya çalışıyor!`)
      
      msg.delete()
      return
    }
    if(msg.guild.channels.find(c => c.name === "Destek Talebi Kanalları")) {
      msg.guild.createChannel(`yardım-${msg.author.discriminator}`, "text").then(c => {
      const category = msg.guild.channels.find(c => c.name === "Destek Talebi Kanalları")
      c.setParent(category.id)
      let role = msg.guild.roles.find(r => r.name === rol.name);
      let role2 = msg.guild.roles.find(r => r.name === "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
        
      /*if (!role) {
      let role2 = msg.guild.roles.find(r => r.name === "@everyone");
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      }*/
        
      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
      .setTitle(`Merhaba ${msg.author.username}!`)
      .addField(`» Bilgilendirme`, db.fetch(`destekM_${msg.guild.id}`) || `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin! \n\n(\`${prefix}destek-mesaj-ayarla\` yazarak bu mesajı değiştirebilirsiniz.)`)
      .addField(`» Taleb Açılma Sebebi`, `${msg.content}`)
      .addField(`» Destek İsteyen Kullanıcı`, `<@${msg.author.id}>`)
      .setFooter(`${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`, msg.guild.iconURL)
      c.send({ embed: embed });
      c.send(`** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`)
      msg.delete()
      }).catch(console.error);
    }
  }

  if (msg.channel.name== kanal) {
    if(!msg.guild.channels.find(c => c.name === "Destek Talebi Kanalları")) {
      msg.guild.createChannel("Destek Talebi Kanalları", 'category').then(category => {
      category.setPosition(1)
      let every = msg.guild.roles.find(c => c.name === "@everyone");
      category.overwritePermissions(every, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
      })
      msg.guild.createChannel(`yardım-${msg.author.discriminator}`, "text").then(c => {
      c.setParent(category.id)
      let role = msg.guild.roles.find(r => r.name === rol.name);
      let role2 = msg.guild.roles.find(c => c.name === "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
        
        /*if (!role) {
      let role2 = msg.guild.roles.find(r => r.name === "@everyone");
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      }*/

      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
      .setTitle(`Merhaba ${msg.author.username}!`)
      .addField(`» Bilgilendirme`, db.fetch(`destekM_${msg.guild.id}`) || `Yetkililerimiz en yakın zamanda burada sorunun ile ilgilenecektir! \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilir, \nSunucudaki tüm Destek Taleplerini kapatmak için ise \`${prefix}talepleri-kapat\` yazabilirsin! \n\n(\`${prefix}destek-mesaj-ayarla\` yazarak bu mesajı değiştirebilirsiniz.)`)
      .addField(`» Taleb Açılma Sebebi`, `${msg.content}`)
      .addField(`» Destek İsteyen Kullanıcı`, `<@${msg.author.id}>`)
      .setFooter(`${msg.guild.name} adlı sunucu ${client.user.username} Destek Sistemi'ni kullanıyor teşekkürler!`, msg.guild.iconURL)
      c.send({ embed: embed });
      c.send(`** @here | 📞Destek Talebi! ** \n**${msg.author.tag}** adlı kullanıcı \`${msg.content}\` sebebi ile Destek Talebi açtı!`)
      msg.delete()
      }).catch(console.error);
    })
  }
}
})

client.on('message', async message => {
  
  if (!message.guild) return;
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  
if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
  if (!message.channel.name.startsWith('yardım-')) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Destek Talebi Kapatma İşlemi!`)
  .setDescription(`Destek talebini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
  .setFooter(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
  .then((m) => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then((collected) => {
      if (!message.guild.channels.find(c => c.name === "destek-kayıtları")) {
      message.guild.createChannel("destek-kayıtları", "text").then(c => {
        let rol = message.guild.roles.find(c => c.name === "@everyone")
      c.overwritePermissions(rol, {
          SEND_MESSAGES: false
      })
      hastebin(`#${message.channel.name} - Mesaj Kayıtları \n\n`+message.channel.messages.filter(m => !m.author.bot).map(m => `- ${m.author.tag}: ${m.content}`).join('\n'), "diff").then(x => {
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Destek Talebindeki mesajlar kayıt altına alınarak hastebine yüklenmiştir. \nLink: ${x}`)
    message.author.send({embed: e})
        
    let s = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`#${message.channel.name} destek Talebindeki mesajlar kayıt altına alınarak hastebine yüklenmiştir. \nLink: ${x}`)
    message.guild.channels.get(c.id).send({embed: s})
        
        message.channel.delete();
        
    })}) }
      
      if (message.guild.channels.find(c => c.name === "destek-kayıtları")) {
      
        hastebin(`#${message.channel.name} - Mesaj Kayıtları \n\n`+message.channel.messages.filter(m => !m.author.bot).map(m => `- ${m.author.tag}: ${m.content}`).join('\n'), "diff").then(x => {
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Destek Talebindeki mesajlar kayıt altına alınarak hastebine yüklenmiştir. \nLink: ${x}`)
    message.author.send({embed: e})
        
    let s = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`#${message.channel.name} destek Talebindeki mesajlar kayıt altına alınarak hastebine yüklenmiştir. \nLink: ${x}`)
    message.guild.channels.get(message.guild.channels.find(c => c.name === "destek-kayıtları").id).send({embed: s})
        
    })
        
      message.channel.delete();
      }
      }) 
      .catch(() => {
        m.edit('Destek talebi kapatma isteği zaman aşımına uğradı.').then(m2 => {
            m2.delete()
        }, 3000);
      });
  });
  
  }
  
});

client.on("message", async message => {
  
  if (!message.guild) return;
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  
  if (message.content.toLowerCase() === prefix+'talepleri-kapat') {
  
  if (db.has(`destekK_${message.guild.id}`) === true) {
  var kanal = message.guild.channels.get(db.fetch(`destekK_${message.guild.id}`)).name
  }
  
  if (db.has(`destekK_${message.guild.id}`) === false) {
  var kanal = "destek-kanalı"
  }
    
    if (db.has(`destekR_${message.guild.id}`) === true) {
  var rol = message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`))
  }
  
  if (db.has(`destekR_${message.guild.id}`) === false) {
  var rol = "Destek Ekibi"
  }
    
  if (!message.channel.name.startsWith('yardım-')) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);
    
  if (message.guild.roles.has(message.guild.roles.find(r => r.name === rol))) {
  if(message.member.roles.has(rol) === false) return message.reply(`Bu komutu sadece **${rol}** rolüne sahip kullanıcılar kullanabilir!`)
  } else {
    if (message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES') === false) return message.reply(`Bu komutu sadece **Mesajları Yönet** iznine sahip kullanıcılar kullanabilr!`)
  }

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Tüm Destek Talepleri Kapatma İşlemi!`)
  .setDescription(`Tüm Destek taleplerini kapatma işlemini onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
  .setFooter(`${client.user.username} | Destek Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
  .then((m) => {
    message.channel.awaitMessages(response => response.content === 'evet', {
      max: 1,
      time: 10000,
      errors: ['time'],
    })
    .then((collected) => {
   try {
     if (!message.guild.channels.find(c => c.name === "destek-kayıtları")) {
     message.guild.createChannel("destek-kayıtları", "text").then(c => {
        let rol = message.guild.roles.find(r => r.name === "@everyone")
      c.overwritePermissions(rol, {
          SEND_MESSAGES: false
      })
      hastebin(`#${message.channel.name} - Mesaj Kayıtları \n\n`+message.channel.messages.filter(m => !m.author.bot).map(m => `- ${m.author.tag}: ${m.content}`).join('\n'), "diff").then(x => {
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Destek Talebindeki mesajlar kayıt altına alınarak hastebine yüklenmiştir. \nLink: ${x}`)
    message.author.send({embed: e})
        
    let s = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`#${message.channel.name} destek Talebindeki mesajlar kayıt altına alınarak hastebine yüklenmiştir. \nLink: ${x}`)
    message.guild.channels.get(c.id).send({embed: s})
        
        message.guild.channels.filter(c => c.name.startsWith('yardım-')).forEach(async (kanal, id) => {
     kanal.delete()
  })
        
    })})}

     if (message.guild.channels.find(c => c.name === "destek-kayıtları")) {
       hastebin(`#${message.channel.name} - Mesaj Kayıtları \n\n`+message.channel.messages.filter(m => !m.author.bot).map(m => `- ${m.author.tag}: ${m.content}`).join('\n'), "diff").then(x => {
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Destek Talebindeki mesajlar kayıt altına alınarak hastebine yüklenmiştir. \nLink: ${x}`)
    message.author.send({embed: e})
        
    let s = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`#${message.channel.name} destek Talebindeki mesajlar kayıt altına alınarak hastebine yüklenmiştir. \nLink: ${x}`)
    message.guild.channels.get(message.guild.channels.find(c => c.name === "destek-kayıtları").id).send({embed: s})
       })
    message.guild.channels.filter(c => c.name.startsWith('yardım-')).forEach(async (kanal, id) => {
     kanal.delete()
  }) };
     
  } catch(e){
      //console.log(e.stack);
  }
    })
      .catch(() => {
        m.edit('Tüm Destek taleblerini kapatma isteği zaman aşımına uğradı.').then(m2 => {
            m2.delete()
        }, 3000);
      });
  });
    
  }
  
});

//log sistemi

client.on("guildMemberAdd", member => {
  
  var user = member.user;
  
  if (db.has(`log_${member.guild.id}`) === false) return;
  
  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`))
  if (!kanal) return;
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Sunucuya Bir Kullanıcı Katıldı!`, member.user.avatarURL)
  .addField("Kullanıcı Tag", member.user.tag, true)
  .addField("ID", member.user.id, true)
  .addField("Discord Kayıt Tarihi", useful.tarih(member.user.createdAt), true)
  .addField("Sunucuya Katıldığı Tarih", useful.tarih(member.joinedAt), true)
  .setThumbnail(member.user.avatarURL)
  kanal.send(embed);
  
});

client.on("guildMemberRemove", member => {
  
  var user = member.user;
  
  if (db.has(`log_${member.guild.id}`) === false) return;
  
  var kanal = member.guild.channels.get(db.fetch(`log_${member.guild.id}`))
  if (!kanal) return;
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
  .addField("Kullanıcı Tag", member.user.tag, true)
  .addField("ID", member.user.id, true)
  .addField("Discord Kayıt Tarihi", useful.tarih(member.user.createdAt), true)
  .addField("Sunucuya Katıldığı Tarih", useful.tarih(member.joinedAt), true)
  .setThumbnail(member.user.avatarURL)
  kanal.send(embed);
  
});

client.on('messageDelete', async (msg) => {
   if (db.has(`log_${msg.guild.id}`) === false) return;
  var kanal = msg.guild.channels.get(db.fetch(`log_${msg.guild.id}`))
  if (!kanal) return;
  if (msg.author.bot) return;
    const logembed = new Discord.RichEmbed()
        .setTitle(`Mesaj silindi.`)
          .setColor(client.ayarlar.renk)
        .setDescription(`<#${msg.channel.id}> kanalında <@${msg.author.id}> tarafından gönderilen bir mesaj silindi. \nSilinen Mesaj: \n\`\`\`\n${msg.content}\n\`\`\``)
        .setFooter(`Silinen Mesaj ID: ${msg.id} | Mesajı Silen Kullanıcı ID: ${msg.author.id}`)
    kanal.send(logembed);
});
  
    client.on('messageUpdate', async (oldMsg, newMsg) => {
      if (!oldMsg.guild) return
      if (db.has(`log_${oldMsg.guild.id}`) === false) return;
  var kanal = oldMsg.guild.channels.get(db.fetch(`log_${oldMsg.guild.id}`))
  if (!kanal) return;
     // if (!oldMsg.guild) return;
      if (oldMsg.author.bot) return;
          const embed = new Discord.RichEmbed()
          .setColor(client.ayarlar.renk)
          .setTitle('Mesaj Düzenlendi.')
          .setDescription(`<@${oldMsg.author.id}> adlı kullanıcı <#${oldMsg.channel.id}> kanalına gönderdiği mesajı düzenledi.`)
          .addField(`Eski Mesaj`, `\`\`\`\n${oldMsg.content}\n\`\`\``)
          .addField(`Yeni Mesaj`, `\`\`\`\n${newMsg.content}\n\`\`\``)
        kanal.send({embed});
      });

client.on('channelCreate', async channel => {
       if (!channel.guild) return
     if (db.has(`log_${channel.guild.id}`) === false) return;
  var kanal = channel.guild.channels.get(db.fetch(`log_${channel.guild.id}`))
  if (!kanal) return;
        if (channel.type === "text") {
          var embed = new Discord.RichEmbed()
          .setColor(client.ayarlar.renk)
          .setTitle(`Kanal oluşturuldu.`)
          .setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
          .setFooter(`Oluşturulan Kanal ID: ${channel.id}`)
        kanal.send({embed});
        };
        if (channel.type === "voice") {
          var embed = new Discord.RichEmbed()
          .setColor(client.ayarlar.renk)
          .setTitle(`Kanal Oluşturuldu.`)
          .setDescription(`#${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
          .setFooter(`Oluşturulan Kanal ID: ${channel.id}`)
        kanal.send({embed});
        }
      })
      
    client.on('channelDelete', async channel => {
      if (!channel.guild) return
     if (db.has(`log_${channel.guild.id}`) === false) return;
  var kanal = channel.guild.channels.get(db.fetch(`log_${channel.guild.id}`))
  if (!kanal) return;
        if (channel.type === "text") {
          let embed = new Discord.RichEmbed()
          .setColor(client.ayarlar.renk)
          .setTitle(`Kanal Silindi.`)
          .setDescription(`\`#${channel.name}\` kanalı silindi. _(metin kanalı)_`)
          .setFooter(`Oluşturulan Kanal ID: ${channel.id}`)
        kanal.send({embed});
        };
        if (channel.type === "voice") {
          let embed = new Discord.RichEmbed()
          .setColor(client.ayarlar.renk)
          .setTitle(`Kanal Silindi.`)
          .setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
          .setFooter(`Oluşturulan Kanal ID: ${channel.id}`)
        kanal.send({embed});
        }
      })

    client.on('roleCreate', async (role) => {
      if (db.has(`log_${role.guild.id}`) === false) return;
  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`))
  if (!kanal) return;
      if (!role.guild) return;
          const embed = new Discord.RichEmbed()
          .setColor(client.ayarlar.renk)
          .setTitle('Rol Oluşturuldu.')
          .setDescription(`\`${role.name}\` isimli rol oluşturulmuştur.`)
        kanal.send({embed});
      });

    client.on('roleDelete', async (role) => {
      if (db.has(`log_${role.guild.id}`) === false) return;
  var kanal = role.guild.channels.get(db.fetch(`log_${role.guild.id}`))
  if (!kanal) return;
      if (!role.guild) return;
          const embed = new Discord.RichEmbed()
          .setColor(client.ayarlar.renk)
          .setTitle('Rol Silindi.')
          .setDescription(`\`@${role.name}\` isimli rol silinmiştir.`)
        kanal.send({embed});
      });

    client.on('memberRoleUpdate', async (memberRole, member) => {
     if (db.has(`log_${memberRole.guild.id}`) === false) return;
  var kanal = memberRole.guild.channels.get(db.fetch(`log_${memberRole.guild.id}`))
  if (!kanal) return;
      if (!memberRole.guild) return;
          const embed = new Discord.RichEmbed()
          .setColor(client.ayarlar.renk)
          .setTitle('Bir Üyenin Rolü Değiştirildi.')
          .setDescription(`\`@${memberRole.name}\` isimli rol <@${member.id}> isimli kullanıcı(ya/dan) verilmiştir/alnmıştır.`)
        kanal.send({embed});
      });

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  
  if (db.has(`log_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.get(db.fetch(`log_${oldMember.guild.id}`))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){
    
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı  \`${oldUserChannel.name}\` isimli sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});

client.on('messageReactionAdd', async (msgReact, user) => {
  
      if (msgReact.message.guild.members.get(user.id).user.bot === true) return;
  
       if (db.has(`log_${msgReact.message.guild.id}`) === false) return;
  
  var kanal = msgReact.message.guild.channels.get(db.fetch(`log_${msgReact.message.guild.id}`))
  if (!kanal) return;
  
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`<#${msgReact.message.channel.id}> kanalında \`${msgReact.message.content}\` mesajına \`${msgReact.message.author.tag}\` adlı kullanıcı tarafından \`${msgReact.emoji.name}\` emojisi eklendi!`)
    kanal.send(embed);
  
});

///özel gförüşürüz

  client.on("guildMemberAdd", async member => {
    let ozelhosgeldin = await db.fetch(`ozelhosgeldin_${member.guild.id}`)
    let giriş = db.fetch(`ozelhoseldin_${member.guild.id}`)
    if (!ozelhosgeldin) return;
    member.send(ozelhosgeldin ? ozelhosgeldin.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
})

client.on("guildMemberRemove", async member => {
    let ozelgorusuruz = await db.fetch(`ozelgorusuruz_${member.guild.id}`)
    let çıkış = db.fetch(`ozelgorusuruz_${member.guild.id}`)
    if (!ozelgorusuruz) return;
    member.send(ozelgorusuruz ? ozelgorusuruz.replace('-sunucu-', `\`${member.guild.name}\``) .replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
})



//Log Sistemi

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdir(`./komutlar/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")

	if(jsfiles.length <= 0) {
		console.log(`${chalk.redBright("Üzgünüm ama hiçbir komut bulunamadı!")}`)
	} else {
		if (err) {
			console.error(`${chalk.redBright("Hata çıktı;")}\n${err}\n\n${chalk.greenBright("Hatayı düzeltmen için bir kaç tavsiye vereceğim. İlk öncelikle ayarları doğru girdiğinden ve boş bırakmadığından emin ol. Daha sonra kendin eklediğin komutlara iyice bak ve örnek komutla karşılaştır. Hatan varsa düzelt. Eğer kodda hata olduğunu düşünüyorsan bildirmekten çekinme!")}`)
		}
		console.log(`${chalk.yellow(jsfiles.length)} komut yüklenecek.`)

		jsfiles.forEach(f => {			let props = require(`./komutlar/${f}`)
			client.commands.set(props.help.name, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name)
			})
			console.log(`Yüklenen komut: ${props.help.name}`)
		})
	}
})


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("message", async msg => { 
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 1)
};

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 150) {
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
    
    db.add(`para_${msg.author.id + msg.guild.id}`, 400)
    
    msg.channel.send(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}** seviye oldun!`)
    
    db.delete(`puancik_${msg.author.id + msg.guild.id}`)
    
  };
  
});
  client.on("message", async msg => {
let ever = await db.fetch(`ever_${msg.guild.id}`) //çok mu zor xd

    if (ever == 'acik') {
        const every = ["@everyone","@here"];
        if (every.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Bu sunucuda everyone yasaklanmış! :warning:').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (ever == 'kapali') {
      
    }
    if (!ever) return;
  });

const DBL = require("dblapi.js");

try {
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0NDIwMDAzMzc4MTU0NzAyOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ5NjQ4NDIxfQ.Zx_di7Gkaql99e6VdQq3qcGfF2kDyFWMCQONLwk3w-Y', client);

client.on('ready', () => {
  dbl.postStats(client.guilds.size);
  dbl.postStats(client.users.size);
  });

  dbl.getStats("444200033781547028").then(stats => {
    console.log('DBL ye gerekli verileri girdim.') // {"server_count":2,"shards":[]}
});
  
} catch (e) {
}

/*client.on('message',async (message, evileye) => {
const Twitch = require("twitch.tv-api");
const twitch = new Twitch({
    id: "zepa42nmpvkny7kzh6fe2b3oht17no",
    secret: process.env.TWITCH_SECRET
});
  let channel = await db.fetch(`twcanlı_${message.guild.id}`)  
  twitch.getUser(channel)
    .then(data => {
        if(db.has(`twkanal_${message.guild.id}`) === true) return message.guild.channels.get(db.fetch(`twkanal_${message.guild.id}`)).send(`${data.stream.display_name} Adlı Kanal Yayında**!**\n **Yayın Linli** : ${data.stream.url} @everyone `);
    })
    .catch(error => {
        console.error(error);
    });
});*/
client.login(client.config.token);