const url = 'https://api.fanlisky.cn/api/qr-fortune/get/';
let url1 = 'https://api.fanlisky.cn/niuren/getSen'
const https = require('https')
//let users = [] //用于判断用户是否抽过签
let { users, msgs } = require("../index")
module.exports = function augur(msg) {
  let user = msg.sender.user_id
  if (msg.atme) {
    let text;
    msg.message.map((item) => {
      if (item.type == 'text') {
        text = item.text.trim()
        console.log(text);
      }
    })
    let m = /抽签/
    let n = /解签/
    let v = /不明所以/
    if (m.test(text)) { //抽签
      if (users.includes(user)) {
        msg.reply("今天已经抽过签了哦，明天再来吧 ^_^", true)
      } else {
        https.get(url + user, res => {
          let list = [];
          res.on('data', chunk => {
            list.push(chunk);
          });
          res.on('end', async () => {
            const data = Buffer.concat(list).toString()
            if (data.errcode !== 100) {
              if (Math.random() < 0.1) msg.reply("不给你抽")
              else {
                users.push(user)
                msg.reply(`今日签文：${data.data.signText}`, true)
              }
            }
          });
        }).on('error', err => {
          console.log('Error: ', err.message);
          msg.reply(`获得签文失败`)
        });

      }
    }
    else if (n.test(text)) {
      if (!users.includes(user)) {
        msg.reply("请先抽签哦~", true)
      } else {
        //console.log(url + user);
        https.get(url + user, res => {
          let list = [];
          res.on('data', chunk => {
            list.push(chunk);
          });
          res.on('end', async () => {
            const data = await JSON.parse(Buffer.concat(list).toString());
            if (data.errcode !== 100) {
              msg.reply(`解签：${data.data.unSignText}`, true)
            }
          });
        }).on('error', err => {
          console.log('Error: ', err.message);
          msg.reply(`获得签文失败`)
        });
      }
    }
    else if (v.test(text)) {
      if (msgs.includes(user)) msg.reply("今天已经和你说过话了，不想说了😛", true)
      else {
        https.get(url1, res => {
          let list = [];
          msgs.push(user)
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
}