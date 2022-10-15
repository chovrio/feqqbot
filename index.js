"use strict"
const { createClient } = require("oicq")
const bot = createClient(2276406925)

// 密码登录
// bot.on("system.login.slider", function (e) {
// console.log("输入ticket：")
// process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
// }).login("test123456")

// 扫码登录
bot.on("system.login.qrcode", function (e) {
	//扫码后按回车登录
	process.stdin.once("data", () => {
		this.login()
	})
}).login()
module.exports = bot

// template plugins
//require("./plugin/plugin-hello") // hello world
require("./plugin/plugin-chat")
require("./plugin/plugin-image") // 发送图文和表情
require("./plugin/plugin-request") // 加群和好友
require("./plugin/plugin-online") // 监听上线事件
require("./plugin/plugin-time")(837470119)// 定时发送消息
require("./plugin/plugin-poke")// 回戳
require("./plugin/plugin-weather")// 天气
process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

