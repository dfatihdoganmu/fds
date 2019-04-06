const Discord = require('discord.js')
const request = require('node-superfetch')
const moment = require('moment')
const { GOOGLE_KEY } = process.env
const useful = require('useful-tools'); 

exports.run = async (client, message, args) => {
  
        if (!args[0]) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Lütfen bir kitap adı yazınız.")
                        .setColor("RANDOM")
                message.channel.send({embed})
                return
        }
 
        const kitap = args.join(" ")
 
        try {
                const { body } = await request
                        .get('https://www.googleapis.com/books/v1/volumes')
                        .query({
                                apiKey: GOOGLE_KEY,
                                q: kitap,
                                maxResults: 1,
                                printType: 'books'
                        });
 
                if(!body.items) {
                        const embed = new Discord.RichEmbed()
                                .setDescription("Aradığınız kitap bulunamadı!")
                                .setColor("RANDOM")
                        message.channel.send({embed})
                        return
                }
       
                const data = body.items[0].volumeInfo;
 
                const embed = new Discord.RichEmbed()
                        .setAuthor(`${data.title} - Kitap Bilgisi`, "https://i.imgur.com/N3oHABo.png", `https://books.google.com.tr/`)
                        .addField("Yazarı", data.authors || 'Bilinmiyor')
                        if(!data.publishedDate) {
                                embed.addField("Yayın Tarihi", 'Bilinmiyor')
                        } else {
                                embed.addField("Yayın Tarihi", useful.tarih(data.publishedDate))
                        }
                        embed.addField("Sayfa Sayısı", data.pageCount || 'Bilinmiyor')
                        if(data.imageLinks) {
                                embed.setThumbnail(`${data.imageLinks ? data.imageLinks.thumbnail : null}`)
                        }
                        embed.setColor("RANDOM")
                message.channel.send({embed})
        } catch (err) {
                message.channel.send(`Hata! \n\`\`\`js\n${err}\n\`\`\``)
        }
}
 
exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['kitap', 'kitapara'],
        permLevel: 0,
        kategori: "arama"
}
 
exports.help = {
        name: 'kitap-ara',
        description: 'Yazılan kitabın bilgisini gösterir.',
        usage: 'kitap-ara [kitap adı]'
}