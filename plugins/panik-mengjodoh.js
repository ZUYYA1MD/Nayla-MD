//Masih ujicoba ya bre
//KLO bilang error artinya lo wibu:) 
//By Raku Gans

const fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')
const { sticker } = require('../system/lib/sticker')
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} ariffb|dinda annisa`
    let [nama1, nama2] = text.split(/[&|.]/i)
    if (!nama1 || !nama2) throw `contoh:\n${usedPrefix + command} ariffb|dinda annisa`

    let res = await fetch(global.API('zeks', '/api/primbonjodoh', { nama1, nama2 }, 'apikey'))
    if (res.status != 200) throw await res.text()
    let json = await res.json()
    if (json.status) {
        let { nama1, nama2, thumb, positif, negatif } = json.result
        stiker = await sticker(false, thumb, nama1, nama2)
        await conn.sendMessage(m.chat, stiker, MessageType.sticker, { quoted: m })
        m.reply(`
*Nama kamu:* ${nama1}
*Nama doi:* ${nama2}
*Positif:*
${positif}
*Negatif:*
${negatif}
*` + mess.wm + `*
`.trim())
    }
    else throw json

}
handler.help = ['jodoh'].map(v => v + ' <nama>|<nama doi>')
handler.tags = ['panik']
handler.command = /^(jodoh)$/i

handler.limit = false

module.exports = handler