const bot = require("../index")
const url = 'https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=23161882&appsecret=G20Ptaq8&city=';
const https = require('https')
module.exports = function weather(msg) {
  if (msg.atme) {
    let text;
    msg.message.map((item) => {
      if (item.type == 'text') {
        text = item.text.trim()
      }
    })
    console.log(text);
    let m = /天气/
    if (m.test(text)) {
      let city = text.trim().replace("天气", '').replace("@蒸汽人", "")
      console.log(url + city);
      https.get(url + city, res => {
        let list = [];
        res.on('data', chunk => {
          list.push(chunk);
        });
        res.on('end', async () => {
          const data = await JSON.parse(Buffer.concat(list).toString());
          if (data.errcode !== 100) {
            msg.reply(`${city}今天${data.wea}${data.win},最低温度${data.tem2}°，最高温度${data.tem1}°。${data.air_tips}${data.aqi.kouzhao},${data.aqi.yundong},${data.aqi.waichu}。`, true)
          } else {
            msg.reply(`${city}不在数据库内`)
          }
        });
      }).on('error', err => {
        console.log('Error: ', err.message);
        msg.reply(`${city}不在数据库内`)
      });
    }
  }
}