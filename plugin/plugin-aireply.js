let url = 'http://api.qingyunke.com/api.php?key=free&appid=0&msg='
const http = require("http");
const { segment } = require("oicq");
const path = require("path");
const message1 = [
  "不知道你要干嘛，试着对我发送help吧!",
  segment.face(300),
  segment.image(path.join(__dirname, '../img/dancun.jpg'))
]
module.exports = function talk(msg) {
  if (msg.atme) {
    let text;
    msg.message.map((item) => {
      if (item.type == 'text') {
        text = item.text.trim()
        console.log(text);
      }
    })
    http.get(url + text, res => {
      let list = [];
      res.on('data', chunk => {
        list.push(chunk);
      });
      res.on('end', async () => {
        const data = await JSON.parse(Buffer.concat(list).toString());
        console.log(data);
        msg.reply(data.content, true)
      });
    }).on("error", err => {
      console.log('Error: ', err.message);
      msg.reply(message1, true)
    });

  }
}