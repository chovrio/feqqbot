const { segment } = require("oicq")
const { bot } = require("../index")
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
    if (time.getHours() == 9 && time.getMinutes() == 0 && time.getSeconds() == 0) {
      let msg = createMessage(arr)
      bot.sendGroupMsg(group, msg)
    }
  }, 1000)
}
/**
 * @param {Array} arr 
 */
function createMessage(arr) {
  let message = [`请以下同学尽快修改群昵称：`]
  arr.forEach((item) => {
    message.push(segment.at(item.user_id))
    message.push(' ')
  })
  message.push("明晚12点会清理不合规矩的同学哦")
  message.push(segment.face(103))
  return message
}

module.exports = timeMsg