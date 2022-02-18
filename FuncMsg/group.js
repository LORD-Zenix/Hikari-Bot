const {
  MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
let setting = JSON.parse(fs.readFileSync('./setting.json'))
const { getBuffer } = require('../FuncBot/myfunc')
const { color, bgcolor } = require('../FuncBot/color')
join = `╔═══ ❰ 「 *WELCOME* 」❱ ════ \n║┣❥ Nama : \n║┣❥ Umur :\n║┣❥ Askot :\n║┣❥ Cewe/Cowo?\n╚════ ⸨ *${setting.BotName}* ⸩ ═════`
leave = '*Kalo Balik Bawain Gorengan Ya*'

teks = `${join}`


module.exports = welcome = async (Hikari, anu) => {
      const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
      const isWelcome = welkom.includes(anu.jid)
      if (!isWelcome) return
    try {
          mem = anu.participants[0]
          console.log(anu)
                try {
                pp_user = await Hikari.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await Hikari.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
             if (anu.action == 'add' && !mem.includes(Hikari.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await Hikari.groupMetadata(anu.jid)
           
                memeg = mdata.participants.length
              num = anu.participants[0]
                let v = Hikari.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
            buff = await getBuffer(`https://api.lolhuman.xyz/api/base/welcome?apikey=${setting.lolkey}&img1=${pp_user}&img2=${pp_grup}&background=https://telegra.ph/file/559d40a73f54e257b0b2e.jpg&username=${encodeURI(anu_user)}&member=${memeg}&groupname= ${encodeURI(mdata.subject)}`)
        buttons = [

          { buttonId: `${setting.prefix}infogroup`, buttonText: { displayText: "INFO GROUP" }, type: 1 },
{buttonId: `${setting.prefix}Rules`, buttonText: {displayText: 'S&K'}, type: 1}
        ];

        imageMsg = (

          await Hikari.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${teks}`,

          footerText: "Silahkan Baca S&K Dan Info Group ya",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await Hikari.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        Hikari.relayWAMessage(prep);

      }

      if (anu.action == "remove" && !mem.includes(Hikari.user.jid)) {

        mdata = await Hikari.groupMetadata(anu.jid);

        num = anu.participants[0];

        let w = Hikari.contacts[num] || { notify: num.replace(/@.+/, "") };

        anu_user = w.vname || w.notify || num.split("@")[0];

        memeg = mdata.participants.length;

        out = `${leave}`;

        buff = await getBuffer(`https://api.lolhuman.xyz/api/base/welcome?apikey=${setting.lolkey}&img1=${pp_user}&img2=${pp_grup}&background=https://telegra.ph/file/559d40a73f54e257b0b2e.jpg&username=${encodeURI(anu_user)}&member=${memeg}&groupname= ${encodeURI(mdata.subject)}`)
            
        buttons = [

          { buttonId: `${setting.prefix}Rules`, buttonText: { displayText: "S&K BOT" }, type: 1 },];

        imageMsg = (

          await Hikari.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${out}`,

          footerText: "SomeOne Leave",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await Hikari.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        Hikari.relayWAMessage(prep);
        }
    } catch (e) {
      console.log('Error : %s', color(e, 'red'))
    }
  }
