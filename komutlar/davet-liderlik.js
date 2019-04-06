const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const table = require('table');
const arraySort = require('array-sort');
const hastebin = require('hastebin-gen');
const useful = require('useful-tools');

exports.run = async (client, message, args) => {
  
 message.guild.fetchInvites().then(i => {
let sort = message.guild.members.filter(m => !m.user.bot).array().sort((a, b) => {return i.filter(d => d.inviter.id === b.user.id).size - i.filter(d => d.inviter.id === a.user.id).size})
let top = sort.splice(0, 10)
let sira = 1
let size = i
let map = top.map(i => `[${sira++}]: ${i.user.tag} \n# Davet Sayısı: ${size.filter(d => d.inviter.id === i.user.id).size}`).join('\n\n')

message.channel.send(`**${message.guild.name} Davet Liderlik Sıralaması**`)
message.channel.send("```md\n"+map+"\n```")
})
  
};

exports.conf = {
  enabled: true,
  aliases: ["davetliderlik", "invite-leaderboard", "leaderboard", "inviteladerboard"],
  permLevel: 0,
  kategori: "davet"
};

exports.help = {
  name: 'davet-liderlik',
  description: 'Sunucudaki davet sıralamasını/liderliğini gösterir.',
  usage: 'davet-liderlik'
};