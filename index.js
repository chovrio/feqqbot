"use strict"
const { createClient } = require("oicq")
const bot = createClient(2153389851)
let users = [];
let msgs = []
// 扫码登录
bot.on("system.login.qrcode", function (e) {
	//扫码后按回车登录
	process.stdin.once("data", () => {
		this.login()
	})
}).login()

module.exports.bot = bot
module.exports.users = users
module.exports.msgs = msgs
require("./plugin/plugin-chat")
require("./plugin/plugin-image") // 发送图文和表情
require("./plugin/plugin-request") // 加群和好友
require("./plugin/plugin-online")(152428380) // 监听上下线事件
require("./plugin/plugin-time")(152428380)// 定时发送消息
require("./plugin/plugin-poke")// 回戳
process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
if (users.length > 0) {
	console.log(users);
	setInterval(() => {
		const date = new Date();
		if ((date.getHours() === 0 || date.getHours() === 24) && date.getMinutes() === 0 && date.getSeconds() === 0) {
			users = []
			msgs = []
		}
	}, 1000)
}
