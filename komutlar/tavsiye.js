const Discord = require('discord.js');
const hook = new Discord.WebhookClient('520290131081691136', 'WieIWlrOHb6l4YglFyTn1L06S-eyLHO6RAyyOvp96BT3njh1XSCgT1Hwy2-d5uI6uYgD');
//const ayarlar = require('../ayarlar.json');
const moment = require('moment');

exports.run = (client, message, args, guild) => {  

  var konum = ''
        if(message.guild.region === "russia") {
            var konum = 'Rusya :flag_ru:'
        }
        if(message.guild.region === "us-west") {
            var konum = 'Batı Amerika :flag_us: '
        }
        if(message.guild.region === "us-south") {
            var konum = 'Güney Amerika :flag_us: '
        }
        if(message.guild.region === "us-east") {
            var konum = 'Doğu Amerika :flag_us: '
        }
        if(message.guild.region === "us-central") {
            var konum = 'Amerika :flag_us: '
        }
        if(message.guild.region === "brazil") {
            var konum = 'Brezilya :flag_br:'
        }
        if(message.guild.region === "singapore") {
            var konum = 'Singapur :flag_sg:'
        }
        if(message.guild.region === "sydney") {
            var konum = 'Sidney :flag_sh:'
        }
        if(message.guild.region === "eu-west") {
            var konum = 'Batı Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-south") {
            var konum = 'Güney Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-east") {
            var konum = 'Doğu Avrupa :flag_eu:'
        }
        if(message.guild.region === "eu-central") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(message.guild.region === "hongkong") {
            var konum = 'Hong Kong :flag_hk: '
        }
        if(message.guild.region === "japan") {
            var konum = 'Japonya :flag_jp:'
        }
        var tarih = ''
        if(moment(message.guild.createdAt).format('MM') === '01') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ocak ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '02') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Şubat ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '03') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Mart ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '04') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Nisan ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '05') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Mayıs ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '06') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Haziran ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '07') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Temmuz ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '08') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ağustos ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '09') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Eylül ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '10') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Ekim ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '11') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Kasım ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
        if(moment(message.guild.createdAt).format('MM') === '12') {
            var tarih = `${moment(message.guild.createdAt).format('DD')} Aralık ${moment(message.guild.createdAt).format('YYYY HH:mm:ss')} `
        }
  
  let mesaj = args.slice(0).join(' ');
  if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setAuthor('Hata').setDescription('- Lütfen geçerli bir **tavsiye** yazın. \n- Eğer boş/gereksiz **tavsiye** gönderirseniz bottan engellenirsiniz!'));
  hook.send(new Discord.RichEmbed().setColor('RANDOM').setAuthor('Yeni Bir Tavsiyemiz Var').addField(`Bildiren Kullanıcının Bilgileri:`, `Kullanıcı: ${message.author.tag} \nKullanıcının Kimliği/ID: ${message.id}`).addField(`Bildiri Yaptığı Sunucu Bilgileri:`, `Sunucu: ${message.guild.name} \nSunucu ID: ${message.guild.id} \nSunucunun Konumu: ${konum} \nSunucunun Kurulduğu Tarih: ${tarih}`).addField(`Bildirilen Tavsite:`, `\`\`\`md\n${mesaj}\`\`\``).setFooter('Rahatsız Bot - Fax', client.user.avatarURL).setTimestamp());
  message.channel.send(new Discord.RichEmbed().setColor('RANDOM').setAuthor('Tavsiye').setDescription(`- Başarılı bir şekilde **tavsiye** bildirildi! \n- Bana **tavsiyeyi** bildirdiğin için teşekkür ederim.`));  
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['rapor', 'raporla', 'tavsiye', 'tavsiyeet', 'tavsiyet', 'öner', 'öneri', 'bildir'],
permLevel: 0,
 kategori: 'iletişim' 
}

exports.help = {
name: 'tavsiye',
description: 'Bot geliştiricisine hataları raporlamayı/tavsiye vermeyi/öneri iletmeyi sağlar.',
usage: 'tavsiye [tavsiye]'
}