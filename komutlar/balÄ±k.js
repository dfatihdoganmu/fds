const Discord = require("discord.js");
const db = require("quick.db");
const { randomRange } = require('../util/Util.js');
const fishes = require('../util/fishy.json');
const talkedRecently = new Set();

exports.run = async (client, message, args, dil, dill) => {
  
  let x = new db.table('market');
  
  if (x.has(`balık_${message.author.id}`) === false) {
    if (dill === 'tr') {
    const embe = new Discord.RichEmbed()
		.setDescription(dil.market.err.replace("{ürün}", "olta").replace("{ürün}", "olta").replace("{prefix}", client.ayarlar.prefix))
		.setColor('RANDOM')
		message.channel.send({embed: embe});
    }
    if (dill === 'en') {
    const embe = new Discord.RichEmbed()
		.setDescription(dil.market.err.replace("{ürün}", "fishing rod").replace("{ürün}", "fishing rod").replace("{prefix}", client.ayarlar.prefix))
		.setColor('RANDOM')
		message.channel.send({embed: embe});
    }
    return
  }
  
  if (talkedRecently.has(message.author.id)) {
            return message.channel.send(dil.time.replace("{süre}", `${10} dakika`));
    } else {

		const fishID = Math.floor(Math.random() * 10) + 1;
		let rarity;
		if (fishID < 5) rarity = 'junk';
		else if (fishID < 8) rarity = 'common';
		else if (fishID < 10) rarity = 'uncommon';
		else rarity = 'rare';
		const fish = fishes[rarity];
		const worth = randomRange(fish.min, fish.max);

		db.add(`para_${message.author.id}`, worth)
		
		const embed = new Discord.RichEmbed()
		.setAuthor(dil.profil.balık.header, client.user.avatarURL)
		.setDescription(dil.profil.balık.msg.replace("{balik}", fish).replace("{para}", worth))
		.setColor('RANDOM')
		message.channel.send(embed);

		talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
        }, 600000);
    }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["balıktut", "balık", "fish", "fishing"],
  permLevel: 0,
    kategori: "profil"
};

exports.help = {
  name: "balık-tut",
  description: "Balık tutarsınız.",
  usage: ""
};