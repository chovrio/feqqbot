const http = require("http")

http.get('http://api.qingyunke.com/api.php?key=free&appid=0&msg=你好啊', res => {
  let list = [];
  res.on('data', chunk => {
    list.push(chunk);
  });
  res.on('end', async () => {
    const data = await JSON.parse(Buffer.concat(list).toString());
    console.log(data);
  });
})