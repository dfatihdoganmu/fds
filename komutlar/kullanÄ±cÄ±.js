const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const useful = require('useful-tools');

exports.run = async (client, message, args) => {
  
	let user = message.mentions.users.first() || client.users.find(u=>u.username===args.slice(0).join(' ')) || client.users.find(u=>u.username===message.guild.members.find(m=>m.nickname===args.slice(0).join(' ')).user.username)
  if (message.guild.members.get(user.id).nickname) {
    user = client.users.find(u=>u.username===args.slice(0).join(' '))
  }
  if (!args.slice(0).join(' ')) {
    user = message.author
  }
  
  const Durum = user.presence.status;
			const Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
			const durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor")))))
    
    const member = message.guild.member(user);
    const embed = new Discord.RichEmbed()
		.setColor(Durm)
		.setThumbnail(user.displayAvatarURL)
    .setAuthor(`${user.username} - Kullanıcı Bilgisi`)
		.addField("Tag", `${user.tag}`)
		.addField("ID", `${user.id}`)
    .addField("Discord Kayıt Tarihi", useful.tarih(user.createdAt))
		.addField("Sunucuya Katılma Tarih", useful.tarih(message.guild.members.get(user.id).joinedAt))
		.addField("Durumu", `${durm || "Bilinmiyor"}`)
    
    try {
    if (user.presence.game.type === 0) {
    embed.addField("Durum Mesajı", `${user.presence.game.name} Oynuyor` || "Durum Mesajı Boş")
    }
    if (user.presence.game.type === 3) {
    embed.addField("Durum Mesajı", `${user.presence.game.name} İzliyor` || "Durum Mesajı Boş")
    }
    if (user.presence.game.type === 2) {
    embed.addField("Durum Mesajı", `${user.presence.game.name} Dinliyor` || "Durum Mesajı Boş")
    }
    if (user.presence.game.type === 1) { 
    embed.addField("Durum Mesajı", `[${user.presence.game.name} YAYINDA](${user.presence.game.url})` || "Durum Mesajı Boş")
    }
    } catch(e) {
      embed.addField("Durum Mesajı", "Durum Mesajı Boş")
    }
    embed.addField("Bot Mu?", `${user.bot ? 'Evet' : 'Hayır'}`)
		.addField("Rolleri", `${member.roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') ? member.roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') : "Sunucuda hiç bir rolü bulunmuyor."}`)
  
   var son = ''
   try {
     
   if (!message.guild.members.get(user.id).lastMessage.embeds[0] || !message.guild.members.get(user.id).lastMessage.edits[1]) { 
      var son = user.lastMessage
    }
    
    if (message.guild.members.get(user.id).lastMessage.embeds[0]) { 
      var son = `**${message.guild.members.get(user.id).lastMessage.embeds[0].author.name}** başlıklı bir embed yollamış.`
   }
     
    if (message.guild.members.get(user.id).lastMessage.edits[1].content) {
      var son = `**${message.guild.members.get(user.id).lastMessage.edits[1].content}** yazan bir mesaj göndermiş ama mesajı **${message.guild.members.get(user.id).lastMessage.edits[0].content}** olarak düzenlemiş.`
    }
    
  
   } catch(e) {
     var son = "Herhangi bir mesaj göndermemiş."
   }
                                                                
    embed.addField("Son Mesajı", son ? son : "Herhangi bir mesaj göndermemiş.")
    message.channel.send({embed});
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı', 'kb', 'kullanıcıbilgi'],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'kullanıcı-bilgi',
  description: 'İstediğiniz kullanıcı veya komutu kullanan kullanıcı hakkında bilgi verir.',
  usage: 'kullanıcı-bilgi [<@kullanıcı>]'
};