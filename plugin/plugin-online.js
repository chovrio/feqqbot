"use strict"
const { bot } = require("../index")

module.exports = (group) => {
	bot.on("system.online", function () {
		// bot.sendGroupMsg(group, '蒸汽人已上线')
		// 你的账号已上线，你可以做任何事
		console.log(`来自plugin-online: 我是${this.nickname}(${this.uin})，我有${this.fl.size}个好友，${this.gl.size}个群`)
	})
	bot.on("system.offline", () => {
		bot.sendGroupMsg(group, '蒸汽人下线维修去了')
	})
}