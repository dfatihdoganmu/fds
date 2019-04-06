const Discord = require('discord.js');
const { stripIndents, oneLine } = require('common-tags');
const moment = require('moment');
const db = require('quick.db');
const useful = require('useful-tools');
var translate = require('node-google-translate-skidz');
 
exports.run = async (client, message, args, dil, dill) => {
  
  const bot = await client.fetchApplication()
  
  var tarih = useful.tarih(client.user.createdAt)
  if (dill === 'tr') {
  const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField(dil.bilgi.owner, "Doğan,Uğur")
    .addField(dil.bilgi.tarih, tarih)
    .addField(dil.bilgi.cmds, client.commands.size)
    .addField(dil.bilgi.prefix, `${client.ayarlar.prefix}`)
    //.addField("Botun Yapımında Kullanılan NPM Paketleri/Modülleri", Object.keys(require('../package.json').dependencies).map(p => "`"+p+"`").join(', '))
	.addField(dil.special.links, `[${dil.special.panel}](${client.ayarlar.web}) \n[${dil.special.botinvite}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847) \n[${dil.special.supportserver}](${client.ayarlar.destek}) \n[${dil.special.DBLpage}](${client.ayarlar.dbl}) \n[${dil.special.DBLvote}](${client.ayarlar.dblvote})`)
  .setFooter(`©${(new Date()).getFullYear()} - ${client.user.username}`, client.user.avatarURL)
  message.channel.send({embed});
  }
  if (dill === 'en') {
  translate({
  text: tarih,
  source: 'tr',
  target: 'en'
}, function(result) {
  var tarih = result.translation
  
    const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField(dil.bilgi.owner, client.users.get(client.ayarlar.sahip[0]).tag, true)
    .addField(dil.bilgi.tarih, tarih, false)
    .addField(dil.bilgi.cmds, client.commands.size, true)
    .addField(dil.bilgi.prefix, `${client.ayarlar.prefix}`, true)
    //.addField("Botun Yapımında Kullanılan NPM Paketleri/Modülleri", Object.keys(require('../package.json').dependencies).map(p => "`"+p+"`").join(', '))
	.addField(dil.special.links, `[${dil.special.panel}](${client.ayarlar.web}) \n[${dil.special.botinvite}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847) \n[${dil.special.supportserver}](${client.ayarlar.destek}) \n[${dil.special.DBLpage}](${client.ayarlar.dbl}) \n[${dil.special.DBLvote}](${client.ayarlar.dblvote})`)
  .setFooter(`©${(new Date()).getFullYear()} - ${client.user.username}`, client.user.avatarURL)
  message.channel.send({embed});
  })
  }
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hakkında', 'about', 'yapımcı', 'yapımcım', 'info', 'owner'],
    permLevel: 0,
    kategori: "bot"
  };
  
  exports.help = {
    name: 'bilgi',
    description: 'Bot hakkında bilgi verir.',
    usage: ''
  };