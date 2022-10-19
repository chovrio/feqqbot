const { segment } = require("oicq")
const { bot, users } = require("../index")
const path = require("path")
const message = [
  {
    type: 'json',
    data: '{"app":"com.tencent.structmsg","desc":"新闻","view":"news","ver":"0.0.0.1","prompt":"[分享]光盘ing | 1w餐券等你兑换！——勤俭节约，拒绝“剩”宴…","meta":{"news":{"action":"","android_pkg_name":"","app_type":1,"appid":1103188687,"ctime":1665980277,"desc":" ","jumpUrl":"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MjM5NDAzNDM2MQ==&mid=2653769629&idx=1&sn=6027d4278601d5c2c3104a0a8752883f&chksm=bd54084b8a23815d9d5f1b1b3e7fd2d4df5e755e6df0c05e67d570f64adb04d88eb4bbb1f97f&mpshare=1&scene=23&srcid=1017Px1NcCK07sA1F6G519TE&sharer_sharetime=1665980273249&sharer_shareid=8e9e7e5e1192e388b67b4ea35f4ae340#rd","preview":"https:\\/\\/mmbiz.qpic.cn\\/mmbiz_jpg\\/ZYxm3AuFUGZXbPwXjUaTxougCXyOW6T3Nmno4FdzmdwID3mspaXGwygZbvqH9ln0BaPRoDuzRYyurEfjVqicfNw\\/300?wx_fmt=jpeg&wxfrom=7","source_icon":"https:\\/\\/p.qpic.cn\\/qqconnect\\/0\\/app_1103188687_1658800746\\/100?max-age=2592000&t=0","source_url":"","tag":"微信","title":"光盘ing | 1w餐券等你兑换！——勤俭节约，拒绝“剩”宴…","uin":1480733667}},"config":{"ctime":1665980277,"forward":true,"token":"32cc3fa75f34dd395b9f133c533218a0","type":"normal"}}',
    id: undefined
  }
]
/**
 * @param {number} group 
 */
function timeMsg(group) {
  const day1 = [
    "起床辣，起床辣，别睡了",
    segment.face(104),
    segment.image(path.join(__dirname, '../img/qichuang.jpg'))
  ]
  const day2 = [
    "该起床卷辣",
    segment.face(104),
    segment.image(path.join(__dirname, '../img/study.jpg'))
  ]

  const night1 = [
    '别卷辣，该睡觉辣💤',
    segment.face(104),
    segment.image(path.join(__dirname, '../img/sleep.jpg')),
  ]
  const night2 = [
    '蒸汽人要关机了',
    segment.face(104),
    segment.image(path.join(__dirname, '../img/sleep2.jpg')),
  ]
  const day = [day1, day2]
  const night = [night1, night2]

  setInterval(() => {
    let time = new Date()
    if (time.getHours() == 8 && time.getMinutes() == 0 && time.getSeconds() == 0) {
      bot.login(true)
      bot.sendGroupMsg(group, day[Math.floor(Math.random() * day.length)])
    }
    if (time.getHours() == 23 && time.getMinutes() == 30 && time.getSeconds() == 30) {
      bot.sendGroupMsg(group, night[Math.floor(Math.random() * night.length)])
      bot.logout(true)
    }
    if (time.getHours() == 12 && time.getMinutes() == 0 && time.getSeconds() == 0) {
      bot.sendGroupMsg(group, '吃饭时间到了，一起进行光盘打卡吧')
      bot.sendGroupMsg(group, message)
    }
    if (time.getHours() == 18 && time.getMinutes() == 0 && time.getSeconds() == 0) {
      bot.sendGroupMsg(group, '吃饭时间到了，一起进行光盘打卡吧')
      bot.sendGroupMsg(group, message)
    }
  }, 1000)
}

module.exports = timeMsg