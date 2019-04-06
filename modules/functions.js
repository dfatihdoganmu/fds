const db = require("quick.db");
const fs = require("fs");

module.exports = (client) => {
  
  client.customCmds = (id, cmd) => {
    
    let komut = cmd['komut']
    let aciklama = cmd['aciklama']
    
    var array = []
	  var kontrol2 = []
    let komutlar = client.cmdd
    
    if(komutlar[id]) {
		for (var i = 0; i < Object.keys(komutlar[id]).length; i++) {
			if(komut === Object.keys(komutlar[id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${aciklama}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[id][i])[0]}": "${komutlar[id][i][Object.keys(komutlar[id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[id][i])[0].toString())
		}
		if(!kontrol2.includes(komut)) {
			array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		} else {
			komutlar[id] = array

			fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			return
		}
	} else {
		array.push(JSON.parse(`{"${komut}": "${aciklama}"}`))
		komutlar[id] = array

		fs.writeFile("./komutlar.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		return
	}
    
  };
  
  client.writeSettings = (id, newSettings) => {
    
    if (!client.guilds.get(id)) return
    
    try {
    
      if (newSettings['onek']) {
    db.set(`prefix_${id}`, newSettings['onek']);
      }
       if (newSettings['gc']) {
    db.set(`gc_${id}`, client.channels.find(c => c.name === newSettings['gc']).id);
       }
      if (newSettings['modlog']) {
    db.set(`mLog_${id}`, client.channels.find(c => c.name === newSettings['modlog']).id);
      }
      if (newSettings['log']) {
    db.set(`log_${id}`, client.channels.find(c => c.name === newSettings['log']).id);  
      }
      if (newSettings['otorol']) {
    db.set(`otoR_${id}`, client.guilds.get(id).roles.find(r => r.name === newSettings['otorol']).id);
      }
      if (newSettings['otorolkanal']) {
    db.set(`otoRolK_${id}`, client.channels.find(c => c.name === newSettings['otorolkanal']).id);
      }
      if (newSettings['tag']) {
    db.set(`tag_${id}`, newSettings['tag']);
      }
      if (newSettings['tagkanal']) {
    db.set(`tagKanal_${id}`, client.channels.find(c => c.name === newSettings['tagkanal']).id);
      }
      if (newSettings['susturrol']) {
    db.set(`sRol_${id}`, client.guilds.get(id).roles.find(r => r.name === newSettings['susturrol']).id);
      }
      if (newSettings['sayacKanal']) {
    db.set(`sKanal_${id}`, client.channels.find(c => c.name === newSettings['sayacKanal']).id);
      }
      if (newSettings['sayac']) {
    db.set(`sayac_${id}`, newSettings['sayac']);
      }
      if (newSettings['girisM']) {
    db.set(`girisM_${id}`, newSettings['girisM']);
      }
      if (newSettings['cikisM']) {
    db.set(`cikisM_${id}`, newSettings['cikisM']);
      }
      if (newSettings['destekK']) {
    db.set(`destekK_${id}`, client.channels.find(c => c.name === newSettings['destekK']).id);
      }
      if (newSettings['destekR']) {
    db.set(`destekR_${id}`, client.guilds.get(id).roles.find(r => r.name === newSettings['destekR']).id);
      }
      if (newSettings['destekMesaj']) {
    db.set(`destekM_${id}`, newSettings['destekMesaj']);
      }
      if (newSettings['link']) {
        db.set(`linkE_${id}`, newSettings['link'])
        if (newSettings['link'] === 'kapali') {
          db.delete(`linkE_${id}`)
        }
      }
      if (newSettings['kufur']) {
        db.set(`küfürE_${id}`, newSettings['kufur'])
        if (newSettings['kufur'] === 'kapali') {
          db.delete(`küfürE_${id}`)
        }
      }
      if (newSettings['kelimefiltre']) {
        db.push(`kFiltre_${id}`, newSettings['kelimefiltre'])
      }
       if (newSettings['davetK']) {
    db.set(`davetK_${id}`, client.channels.find(c => c.name === newSettings['davetK']).id);
      }
       if (newSettings['sayacGiris']) {
    db.set(`sayacGM_${id}`, newSettings['sayacGiris']);
      }
       if (newSettings['sayacCikis']) {
    db.set(`sayacCM_${id}`, newSettings['sayacGiris']);
      }
      if (newSettings['davetRol'] || newSettings['davetSayi']) {
    db.push(`davetSayarSistem_${id}`, JSON.parse(`{"${newSettings['davetRol']}":"${newSettings['davetSayi']}"}`))
      }      
   
    } catch (err) {
      //console.error(err)
    };
        };

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };    

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.wait = require("util").promisify(setTimeout);

  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);

    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};
