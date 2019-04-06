const Discord = require('discord.js');
exports.run = async(client, message, args) => { 
const emoji1 = message.client.emojis.get('479255077966708736');
const emoji2 = message.client.emojis.get('472075400760262667');
const emoji3 = message.client.emojis.get('472075448273076225');
const emoji4 = message.client.emojis.get('472075506309922847');
const emoji5 = message.client.emojis.get('472075400760262667');
const emoji6 = message.client.emojis.get('472074734490877967');
      let isEnabled;
      message.reply("Rahatsız Bot Canlı Destek Komutunu Kullandığınız İçin Teşekkürler.");
      let chan = message.channel;
      let destekKanal = "562262548678836270";
      const embed = new Discord.RichEmbed()
        .addField('Uyarı', `Canlı Destek Çağrısı`)
        .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL}`)
        .setColor(0xFF0000)
        .addField(`Bilgiler`, `**Sunucu**: ${message.guild.name} (${message.guild.id}) \n**Kanal**: #${message.channel.name} (${message.channel.id}) \n**Destek İsteyen**: ${message.author.tag} (${message.author.id})`)
        .setTimestamp()
      client.channels.get(destekKanal).send({
        embed: embed
      });
    const collector = client.channels.get(destekKanal).createCollector(message => message.content.startsWith(''), {
      time: 0
    })
    client.channels.get(destekKanal).send(' Destek çagrısı bağlanmak için `katıl` yazınız. İptal Etmek İçin `kapat` yazınız.')
    collector.on('message', (message) => {
      if (message.content === 'kapat') collector.stop('aborted')
      if (message.content === 'katıl') collector.stop('success')
    })
    collector.on('end', (collected, reason) => {
      if (reason === 'time') return message.reply('Çagrı zaman aşımına uğradı.')
      if (reason === 'aborted') {
        message.reply('Çağrı reddedildi.')
        client.channels.get(destekKanal).send('Başarıyla çağrı reddedildi.')
      }
      if (reason === 'success') {
        client.channels.get(destekKanal).send('Destek çagrısı alındı!')
        client.channels.get(destekKanal).send('Destek çağrısını kapatmak için `kapat` yazınız.')
        chan.send(`${message.author}`)
        chan.send('Çağrınız bir destek yetkilisi tarafından alındı!')
        chan.send(':hourglass: En Yakın Zamanda Size Yardımcı Olacagız.')
        chan.send('Destek çagrısı kapatmak için `kapat` yazınız.')
        isEnabled = true
        client.on('message', message => {
          function contact() {
            if (isEnabled === false) return
            if (message.author.id === client.user.id) return
            if (message.content.startsWith('kapat')) {
              message.channel.send('Çağrı Kapatıldı.')
              if (message.channel.id === chan.id) client.channels.get(destekKanal).send('Çağrı karşı taraftan kapatıldı.')
              if (message.channel.id === destekKanal) chan.send('Çağrı karşı taraftan kapatıldı.')

              return isEnabled = false
            }
            if (message.channel.id === chan.id) client.channels.get(destekKanal).send(`**${message.author.tag}**: ${message.content}`)
            if (message.channel.id === destekKanal) chan.send(`**${message.author.tag}**: ${message.content}`)
          }
          contact(client)
        })
      }
    })
}
  exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['canlı-destek'],
  permLevel: 0,
  kategori: 'iletişim' 
};

exports.help = {
  name: 'canlıdestek',
  ad: 'Canlı Destek', 
  description: 'Yazdığınız mesaj anında Destek Ekibine Gider.',
  usage: 'canlıdestek'
}; 