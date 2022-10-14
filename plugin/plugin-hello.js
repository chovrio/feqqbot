"use strict"
const { segment } = require("oicq")
const { bot } = require("../index")

// hello world
bot.on("message", function (msg) {
	if (msg.atme) {
		let text = msg.message[1].text
		console.log(msg.message[1].text);
		switch (text) {
			case ' 近期推文':
				msg.reply("不吃", true)
				break;
			case ' 睡觉':
				msg.reply("不睡", true)
				break;
			case ' 打豆豆':
				msg.reply("不打", true)
				break
			case ' help':
				msg.reply(`试着对我说\n关于前端\n睡觉\n打豆豆`, true)
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