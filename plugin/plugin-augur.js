const url = 'https://api.fanlisky.cn/api/qr-fortune/get/';
let url1 = 'https://api.fanlisky.cn/niuren/getSen'
const https = require('https')
module.exports = function augur(msg) {
  let user = msg.sender.user_id
  console.log(user);
  if (msg.atme) {
    let text;
    msg.message.map((item) => {
      if (item.type == 'text') {
        text = item.text.trim()
      }
    })
    console.log(text);
    let m = /抽签/
    let n = /解签/
    let v = /每日一言/
    if (m.test(text)) {
      console.log(url + user);
      https.get(url + user, res => {
        let list = [];
        res.on('data', chunk => {
          list.push(chunk);
        });
        res.on('end', async () => {
          const data = await JSON.parse(Buffer.concat(list).toString());
          if (data.errcode !== 100) {
            if (Math.random() < 0.1) msg.reply("不给你抽")
            else msg.reply(`今日签文：${data.data.signText}`, true)
          } else {

          }
        });
      }).on('error', err => {
        console.log('Error: ', err.message);
        msg.reply(`获得签文失败`)
      });
    }
    if (n.test(text)) {
      console.log(url + user);
      https.get(url + user, res => {
        let list = [];
        res.on('data', chunk => {
          list.push(chunk);
        });
        res.on('end', async () => {
          const data = await JSON.parse(Buffer.concat(list).toString());
          if (data.errcode !== 100) {
            if (Math.random() < 0.1) msg.reply("不给你抽")
            else msg.reply(`解签：${data.data.unSignText}`, true)
          } else {

          }
        });
      }).on('error', err => {
        console.log('Error: ', err.message);
        msg.reply(`获得签文失败`)
      });
    }
    if (v.test(text)) {
      https.get(url1, res => {
        let list = [];
        res.on('data', chunk => {
          list.push(chunk);
        });
        res.on('end', async () => {
          const data = await JSON.parse(Buffer.concat(list).toString());
          console.log(data);
          if (msg.errcode !== 100) {
            msg.reply(`${data.data}`, true)
          }
        });
      }).on('error', err => {
        console.log('Error: ', err.message);
        msg.reply(`获得签文失败`)
      });
    }
  }
}