const https = require('https')
const url = 'https://api.vvhan.com/api/reping'
module.exports = function music(msg) {
    if (msg.atme) {
        let text;
        msg.message.map((item) => {
            if (item.type == 'text') {
                text = item.text.trim()
            }
        })
        if (/网易云/.test(text)) {
            https.get(url, (res) => {
                let list = [];
                res.on('data', (data) => {
                    list.push(data)
                })
                res.on('end', () => {
                    let comment = JSON.parse(Buffer.concat(list).toString());
                    msg.reply(`网易云热评:\n${comment.data.content}`)

                })
            }).on('error', (err) => {
                console.log('Error: ' + err.message);
                msg.reply('啊哦，菲菲不会了')
            })
        }
    }
}