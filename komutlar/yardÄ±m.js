const Discord = require('discord.js');
//const ayarlar = require('../ayarlar.json');
const { stripIndents, oneLine } = require('common-tags');
const db = require('quick.db');

let s = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'
]

let kk = [
"eğlence",
"kullanıcı",
"sunucu",
"profil",
"moderasyon",
"bot",
"iletisim",
"yapımcı",
"oyun",
"ayarlar",
"özel",
"genel",
"efekt",
"premium",
"lvl"
]

exports.run = (client, message, args) => {
  
     if (!args[0]) {
      
  const help = {}
  
  //const commandNames = Array.from(client.commands.keys());

		client.commands.forEach((command) => {
			const cat = command.conf.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
      const cmds = Array.from(client.commands.filter(c => c.conf.kategori === cat).keys())
      const longest = cmds.reduce((long, str) => Math.max(long, str.length), 0);
			help[cat].push(`${command.help.name}${' '.repeat(longest - command.help.name.length)} :: ${command.help.description}`);
		})
	var str = `= ${client.user.username} - Yardım = \n[ Bir komut hakkında ayrıntılı bilgi  almak için ${client.ayarlar.prefix}yardım <komut adı> yazabilirsin.]\n\n`
  for (const kategori in help) {
      var k = kategori
      .replace("eğlence", "eğlence komutları")
      .replace("kullanıcı", "kullanıcı komutları")
      .replace("sunucu", "sunucu komutları")
      .replace("davet", "Gelişmiş Davet Sistemi")
      .replace("moderasyon", "moderasyon komutları")
      .replace("bot", "bot komutları")
      .replace("iletisim", "bot iletişim - destek komutları")
      .replace("profil", "profil sistemi")
      .replace("arama", "arama komutları")
      .replace("yapımcı", "bot yapımcısı komutları")
      .replace("oyun", "oyun komutları")
      .replace("sistemm", "geliştirilmiş sistemsel komutlar")
      .replace("ayarlar", "ayarlar")
      .replace("özel", "özel komut sistemi")
      .replace("genel", "genel komutlar")
      .replace("premium", "premium komutlar (Ücretsiz)")
      .replace("lvl", "gelişmiş seviye sistemi")
      .replace("efekt", "efekt Komutları")
      .replace("kisiozel", "kişiye özel komutlar")
      
			str += `= ${k.charAt(0).toUpperCase() + k.slice(1)} = \n${help[kategori].join("\n")}\n\n`
    
		}
		message.author.sendCode('asciidoc', str, {split: true})
     .catch(err => {
      const hata = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username} | Yardım`, client.user.avatarURL)
  .setDescription(`_Muhteşem, işe yarar kullanışlı komutlarım hakkında ve sistemlerim hakkında bilgiyi sana özel mesaj olarak gönderemiyorum çünkü özel mesajların kapalı veya botu engelledin!_`)
    message.channel.send(hata)
    })
      
  const ozelmesajkontrol = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username} | Yardım`, client.user.avatarURL)
  .setDescription(`_Muhteşem, işe yarar kullanışlı komutlarım hakkında ve sistemlerim hakkında bilgiyi özel mesaj olarak gönderdim!_`);
  message.channel.send(ozelmesajkontrol)
}

  if (args[0]) {
    for (var i = 0; i < client.cmdd[message.guild.id].length; i++) {
    if (client.commands.has(args[0]) || client.aliases.has(args[0]) || Object.keys(client.cmdd[message.guild.id][i])[0].toString() === args[0]) {
    if(Object.keys(client.cmdd[message.guild.id][i])[0].toString() !== args[0]) {
      let cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
      
       let y = cmd.conf.permLevel
      let yetki = y.toString()
      .replace(0, 'Yetki gerekmiyor')
      .replace(1, 'Mesajları Yönet yetkisi gerekiyor')
      .replace(2, 'Üyeleri At yetkisi gerekiyor')
      .replace(3, 'Üyeleri Yasakla yetkisi gerekiyor')
      .replace(4, 'Yönetici yetkisi gerekiyor')
      .replace('ozel', 'Sunucu Sahibi olmak gerekiyor')
      .replace(5, 'Bot yapımcısı olmak gerekiyor')
      
      let a = [ 'komut', 'açıklama', 'kategori', 'gerekli yetki', 'doğru kullanım', 'komutun diğer adları'].reduce((long, str) => Math.max(long, str.length), 0); 
      
      message.channel.sendCode('asciidoc', stripIndents`
= Komut - Yardım =
Komut${' '.repeat(a - 'komut'.length)} :: ${cmd.help.name}
Açıklama${' '.repeat(a - "açıklama".length)} :: ${cmd.help.description}
Kategori${' '.repeat(a - "kategori".length)} :: ${cmd.conf.kategori.toString().replace('lvl', 'seviye').replace('sistemm', 'sistem').toProperCase()}
Kullanım${' '.repeat(a - "kullanım".length)} :: ${cmd.help.usage || cmd.help.name}
Kullanılabilir Mi?${' '.repeat(a - "kullanılabilir mi?".length)} :: ${cmd.conf.enabled ? 'Evet komut aktif durumda' : 'Hayır komut aktif durumda değil'}.
Gerekli Yetki${' '.repeat(a - "gerekli yetki".length)} :: ${yetki}.
Diğer Adları${' '.repeat(a - "diğer adları".length)} :: ${cmd.conf.aliases.join(', ')}
`)
      message.channel.sendCode('yaml', '# Kullanım kısmında [] içindeki argümanlar gerekli/zorunlu, [<>] içindeki argümanlar yazılabilir ama gerekli/zorunlu değildir.')
    }    
    } else {
          let e = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(`[\`${client.user.username}\`](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847)'ta \`${args[0]}\` isminde bir komut bulunamadı! \`${client.ayarlar.prefix}yardım\` yazarak [\`${client.user.username}\`](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847)'tın tüm komutlarını görebilirsiniz.`)
          if(Object.keys(client.cmdd[message.guild.id][i])[0].toString() !== args[0]) return message.channel.send({embed: e})
    }}

    if (client.cmdd[message.guild.id]) {
      for (var i = 0; i < client.cmdd[message.guild.id].length; i++) {
			if(Object.keys(client.cmdd[message.guild.id][i])[0].toString() === args[0]) {
         let a = [ 'komut', 'açıklama', 'kategori', 'gerekli yetki', 'doğru kullanım', 'komutun diğer adları'].reduce((long, str) => Math.max(long, str.length), 0); 
        message.channel.sendCode('asciidoc', stripIndents`
= Özel Komut - Yardım =
Komut${' '.repeat(a - 'komut'.length)} :: ${args[0]}
Açıklama${' '.repeat(a - "açıklama".length)} :: ${client.cmdd[message.guild.id][i][args[0]]}
Kategori${' '.repeat(a - "kategori".length)} :: Bulunmuyor.
Kullanım${' '.repeat(a - "kullanım".length)} :: Bulunmuyor.
Kullanılabilir Mi?${' '.repeat(a - "kullanılabilir mi?".length)} :: Özel komutlar her zaman kullanılabilir.
Gerekli Yetki${' '.repeat(a - "gerekli yetki".length)} :: Özel komutlar için yetki gerekmez.
Diğer Adları${' '.repeat(a - "diğer adları".length)} :: Bulunmuyor.
`)
      }
    }
    }
    return
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'help', 'y'],
  permLevel: 0,
  kategori: 'genel'
};

exports.help = {
  name: 'yardım',
  category: 'genel',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında bilgi verir.',
  usage: 'yardım [<komut adı>]'
};