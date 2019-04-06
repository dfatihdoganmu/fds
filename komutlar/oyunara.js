const Discord = require('discord.js');
const request = require('node-superfetch');
const moment = require('moment');
require('moment-duration-format');
const useful = require('useful-tools');

module.exports.run = async (client, msg, args) => {

  const query = args.slice(0).join(' ');
  if (!query) return msg.reply("Bilgi almak istediğin oyunun adını yazmalısın!")
  
  if (query === "minecraft" || query === "mc" || query === "Minecraft" || query === "MC" || query === "Mc" || query === "MİNECRAFT" || query === "MINECRAFT" ) {
    try {
      
    var p = ["Android", "iOS", "XBOX ONE", "XBOX 360", "Raspberry Pi", "PlayStation 3", "PlayStation 4", "PlayStation Vita", "Nintendo Switch", "Windows Phone", "Amozon Device", "Windows", "Mac", "Linux"]
      
    const embed = new Discord.RichEmbed()
				.setColor("RANDOM")
				.setAuthor(`Minecraft - Oyun Arama Sistemi`, 'https://img00.deviantart.net/9cc9/i/2011/008/6/1/minecraft_hd_icon___mac___pc_by_hunterkharon-d36qrs5.png')
				.setURL(`http://minecraft.net/`)
				.setThumbnail('https://i.ytimg.com/vi/SQq6IDdBNGk/maxresdefault.jpg')
				.addField("Fiyat", "[23,95 EUR](https://minecraft.net/tr-tr/?ref=m)")
				.addField("Meta Puanı", "93" || 'Bilinmiyor')
				.addField("Önermeler", 'Bilinmiyor')
				.addField("Platformlar", p.join(', ') || 'Bilinmiyor')
				.addField("Yayınlanma Tarihi", "16/06/2009" || 'Bilinmiyor')
				.addField("DLC Sayısı", "0")
				.addField("Geliştiriciler", "Mojang Inc, Microsoft Corporation" || 'Bilinmiyor')
				.addField("Yayıncılar", "Microsoft Corporation" || 'Bilinmiyor')
			return msg.channel.send(embed);
		} catch (err) {
			return msg.reply(`Bir Hata Oluştu! \n**Hata:** \n\`${err.message}\``);
    }
    return;
  }
  
  try {
			const id = await search(query);
			if (!id) return msg.reply("oyun bulunamadı!");
			const data = await fetchGame(id);
			const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Ücretsiz';
			const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Ücretsiz';
			const price = current === original ? current : `~~${original}~~ ${current}`;
			const platforms = [];
			if (data.platforms) {
				if (data.platforms.windows) platforms.push('Windows');
				if (data.platforms.mac) platforms.push('Mac');
				if (data.platforms.linux) platforms.push('Linux');
			}
			const embed = new Discord.RichEmbed()
				.setColor("RANDOM")
				.setAuthor(`${data.name} - Oyun Arama Sistemi`, 'https://i.imgur.com/xxr2UBZ.png', 'http://store.steampowered.com/')
				.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
				.setThumbnail(data.header_image)
				.addField("Fiyat", price)
				.addField("Meta Puanı", data.metacritic ? data.metacritic.score : 'Bilinmiyor')
				.addField("Önermeler", data.recommendations ? data.recommendations.total : 'Bilinmiyor')
				.addField("Platformları", platforms.join(', ') || 'Bilinmiyor')
        .addField("Yayınlanma Tarihi", useful.tarih(data.release_date.date) || 'Bilinmiyor')
				.addField("DLC Sayısı", data.dlc ? data.dlc.length : "0")
				.addField("Geliştiriciler", data.developers ? data.developers.join(', ') || 'Bilinmiyor' : 'Bilinmiyor')
				.addField("Yayıncılar", data.publishers ? data.publishers.join(', ') || 'Bilinmiyor' : 'Bilinmiyor')
			return msg.channel.send(embed);
		} catch (err) {
			return msg.reply(`Bir Hata Oluştu! \n**Hata:** \n\`${err.message}\``);
    }
  
};

  async function search(query) {
    const { body } = await request
        .get('https://store.steampowered.com/api/storesearch')
        .query({
            cc: 'tr',
            l: 'tr',
            term: query
        });
    if (!body.items.length) return null;
    return body.items[0].id;
}

async function fetchGame(id) {
    const { body } = await request
        .get('https://store.steampowered.com/api/appdetails')
        .query({ appids: id });
    return body[id.toString()].data;
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["steammağaza", "steam-mağaza", "steamstore", "steam-store", "steam", "oyunara", "steamoyun", "steam-oyun"],
  permLevel: 0,
    kategori: "arama"
};

exports.help = {
  name: 'oyun-ara',
  description: 'Verilen oyun hakkında bilgi verir.',
  usage: 'oyun-ara [oyun adı]'
};