const bot = require("../index")
const url = 'https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=23161882&appsecret=G20Ptaq8&city=';
const https = require('https')
module.exports = function weather(msg) {
  
  new Promise((resolve) => {
    resolve('ok')
    if (msg.atme) {
      let text = msg.message[1].text
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
            msg.reply(`${city}今天${data.wea}${data.win},最低温度${data.tem2}°，最高温度${data.tem1}°。${data.air_tips}${data.aqi.kouzhao},${data.aqi.yundong},${data.aqi.waichu}。`, true)
          });
        }).on('error', err => {
          console.log('Error: ', err.message);
        });
      }
    }
  })
}