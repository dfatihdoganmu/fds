const Discord = require('discord.js');
const { stripIndents, oneLine } = require('common-tags');

exports.run = async (client, message) => {
  
const top = client.guilds.sort((a,b)=>a.memberCount-b.memberCount).array().reverse()
const x = top.splice(0, 10)
let no = 1
const y = x.map(t => `${no++}. ${t.name} \n# Toplam Üye: ${t.members.size} | İnsan: ${t.members.filter(u => !u.user.bot).size} | Bot: ${t.members.filter(u => u.user.bot).size}`).join('\n\n')

//message.channel.send(`1. **${top[0].name}**: ${top[0].memberCount}\n2. **${top[1].name}**: ${top[1].memberCount}\n3. **${top[2].name}**: ${top[2].memberCount}\n4. **${top[3].name}**: ${top[3].memberCount}\n5. **${top[4].name}**: ${top[4].memberCount}\n6. **${top[5].name}**: ${top[5].memberCount}\n7. **${top[6].name}**: ${top[6].memberCount}\n8. **${top[7].name}**: ${top[7].memberCount}\n9. **${top[8].name}**: ${top[8].memberCount}\n10. **${top[9].name}**: ${top[9].memberCount}`)
message.channel.send(`**${client.user.username} - Top10 Listesindeki Sunucular**`)
message.channel.send("```md\n"+y+"\n```")
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['top10-listesi', 'top10-list'],
  permLevel: 0,
    kategori: "genel"
};

exports.help = {
  name: 'top10',
  description: 'Botun bulunduğu sunuculardan en çok kişiye sahip olan 10 sunucuyu sıralar.',
  usage: ''
};