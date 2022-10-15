const { segment } = require("oicq")
const bot = require("../index")
const path = require("path")
console.log(path.join(__dirname, '../img/sleep.jpg'));
let arr = []
/**
 * @param {number} group 
 */
function timeMsg(group) {
  const message1 = [
    "该起床卷辣",
    segment.face(104),
    segment.image(path.join(__dirname, '../img/study.jpg'))
  ]
  const message2 = [
    '别卷辣，该睡觉辣💤',
    segment.face(104),
    segment.image(path.join(__dirname, '../img/sleep.jpg')),
  ]
  setInterval(() => {
    let time = new Date()
    if (time.getHours() == 8 && time.getMinutes() == 0 && time.getSeconds() == 0) {
      bot.sendGroupMsg(group, message1)
    }
    if (time.getHours() == 23 && time.getMinutes() == 30 && time.getSeconds() == 30) {
      bot.sendGroupMsg(group, message2)
    }
  }, 1000)
}

module.exports = timeMsg