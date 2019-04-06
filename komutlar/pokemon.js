const Discord = require('discord.js')
const Pokedex = require('pokedex-api')
const pokedex = new Pokedex()
 
exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  try {
        if (!args[0]) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Lütfen bir pokemon adi veya ID numarası yazınız.")
                        .setColor("RANDOM")
              message.channel.send(embed)
        }                const pokeponum = args.join(" ")
                const pokemon = await pokedex.getPokemonByName(encodeURIComponent(pokeponum));
                const pokepon = pokemon[0]
                const embed = new Discord.RichEmbed()
                       embed.setAthor(`${pokepon.name} | - Pokemon Bilgisi`)                       
                         .addField("Numarası", pokepon.number)           
                         .addField("Türü" , pokepon.species)
                        .addField("Tipi", pokepon.types.join(', '))
                        .addField("Normal Yetenekler", pokepon.abilities.normal.join(', ') || 'Bilinmiyor')
                        .addField("Gizli Yetenekler", pokepon.abilities.hidden.join(', ') || 'Bilinmiyor')                      
                         .addField("Yumurta Grupları", pokepon.eggGroups.join(', '))
                        .addField("Cinsiyeti", pokepon.gender.length ? `Erkek %${pokepon.gender[0]}` || `Kadın %${pokepon.gender[1]}` : 'Bilinmiyor')
                        .addField("Boyu", pokepon.height)
                        .addField("Ağırlığı", pokepon.weight)
                        .setThumbnail(pokepon.sprite)
                        .setColor("RANDOM")
                message.channel.send({embed})
        } catch (err) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Aradığınız pokemon bulunamadı!")
                        .setColor("RANDOM")
                message.channel.send({embed})
        }
}
 
exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['pokedex'],
        permLevel: 0,
        kategori: 'arama'
}
 
exports.help = {
        name: 'pokemon',
        description: 'Belirtilen Pokemon hakkında bilgi verir.',
        usage: 'pokemon [pokemon ismi/pokemon numarası]'
}