const https = require('https')
module.exports = function music(msg) {
    if (msg.atme) {
        let text;
        // console.log(msg);
        msg.message.map((item) => {
            if (item.type == 'text') {
                text = item.text.trim()
            }
        })
        https.get('https://api.vvhan.com/api/reping', (res) => {
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
        //console.log(text);
        // 点歌功能
        /* if (text == '点歌') {
            msg.reply("点歌正确姿势：点歌+歌名")
        } else {
            if (/点歌/.test(text)) {
                let song = text.trim().replace("点歌", '').replace("@蒸汽人", "")
                console.log(`https://api.vvhan.com/api/music?id=${song}&type=song&media=netease`);
                https.get(`https://api.vvhan.com/api/music?id=${song}&type=song&media=netease`, res => {
                    let list = [];
                    res.on('data', (data) => {
                        console.log(data);
                        list.push(data)
                    })
                    res.on('end', async () => {
                        let data = await JSON.parse(Buffer.concat(list).toString())
                        console.log(data);
                    })
                })
            }
        } */
    }
}