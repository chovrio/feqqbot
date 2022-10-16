const { segment } = require("oicq")
const { bot, users } = require("../index")
const path = require("path")
console.log(path.join(__dirname, '../img/sleep.jpg'));
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
    // if (time.getHours() == 8 && time.getMinutes() == 0 && time.getSeconds() == 0) {
    if (time.getHours() == 10 && time.getMinutes() == 30 && time.getSeconds() == 0) {
      bot.sendGroupMsg(group, day[Math.floor(Math.random() * day.length)])
    }
    // if (time.getHours() == 23 && time.getMinutes() == 30 && time.getSeconds() == 30) {
    if (time.getHours() == 10 && time.getMinutes() == 30 && time.getSeconds() == 00) {
      bot.sendGroupMsg(group, night[Math.floor(Math.random() * night.length)])
    }
  }, 1000)
}

module.exports = timeMsg