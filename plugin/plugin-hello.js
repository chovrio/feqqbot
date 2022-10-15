"use strict"
const { segment } = require("oicq")
const bot = require("../index")
const weather = require("./plugin-weather")
// hello world
bot.on("message", function (msg) {
	if (msg.atme) {
		let text = msg.message[1].text.trim()
		console.log(1);
		let fn = str => eval(`/${str}/`).test(text)
		console.log(2);
		console.log(fn("近期推文"));
		switch (true) {
			case fn('近期推文'):
				msg.reply(`先睹为快即将到来的HTML6：https://juejin.cn/post/7032874253573685261\n7 个少见但有用的 HTML 属性：https://juejin.cn/post/7085863634449989639\nhtml篇--这可能是目前较为全面的html面试知识点了吧：https://juejin.cn/post/6844904180943945742`, true)
				break;
			case fn('睡觉'):
				msg.reply("不睡", true)
				break;
			case fn('打豆豆'):
				msg.reply("不打", true)
				break
			case fn('help'):
				msg.reply(`试着对我说\n近期推文\n城市天气，例：重庆天气`, true)
				break;
			case fn("天气"):
				weather(msg)
				break;
			default:
				msg.reply("不知道你要干嘛，试着对我发送help吧!", true)
				break;
		}
	}
	if (msg.raw_message === `${msg.atme} `)
		msg.reply("hello world", true) //改为false则不会引用
	segment.at(msg.to_id)
})

// 撤回和发送群消息
bot.on("message.group", function (msg) {
	if (msg.raw_message === "dice") {
		// 撤回这条消息
		msg.recall()
		// 发送一个骰子
		msg.group.sendMsg(segment.dice())
		// 发送一个戳一戳
		msg.member.poke()
	}
})
// 接收戳一戳
bot.on("notice.group.poke", function (e) {
	if (e.target_id === this.uin) {
		this.sendGroupPoke(e.group_id, e.operator_id)
	}
})