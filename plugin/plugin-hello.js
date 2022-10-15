"use strict"
const { segment } = require("oicq")
const { bot } = require("../index")
const weather = require("./plugin-weather")
const augur = require("./plugin-augur")
// hello world
bot.on("message", function (msg) {
	if (msg.atme) {
		let text;
		msg.message.map((item) => {
			if (item.type == 'text') {
				text = item.text.trim()
			}
		})
		text.replace("天气", "")
		// let fn = str => eval(`/${str}/`).test(text)
		/**
		 * @param {string []} strArr 
		 */
		let fn = (strArr) => {
			let flag = true
			strArr.map((item) => {
				if (!eval(`/${item}/`).test(text)) flag = false
			})
			return flag
		}
		switch (true) {
			case fn(['近期推文']):
				msg.reply(`先睹为快即将到来的HTML6：https://juejin.cn/post/7032874253573685261\n7 个少见但有用的 HTML 属性：https://juejin.cn/post/7085863634449989639\nhtml篇--这可能是目前较为全面的html面试知识点了吧：https://juejin.cn/post/6844904180943945742`, true)
				break;
			case fn(['睡觉']):
				msg.reply("不睡", true)
				break;
			case fn(['打豆豆']):
				msg.reply("不打", true)
				break
			case fn(['help']):
				msg.reply(`试着对我说\n近期推文\n城市天气，例：重庆天气\n抽签\n解签\n每日一言`, true)
				break;
			case fn(["天气"]):
				weather(msg)
				break;
			case fn(["抽签"]):
				augur(msg);
				break
			case fn(["解签"]):
				augur(msg)
				break
			case fn(['每日一言']):
				augur(msg)
				break
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

let GroupMessage = {
	post_type: 'message',
	message_id: 'MerHp1hCM+MAAAgIKmEDIWNKPG4B',
	user_id: 1480733667,
	time: 1665809518,
	seq: 2056,
	rand: 711000865,
	font: '微软雅黑',
	message: [
		{ type: 'text', text: '重庆天气' },
		{ type: 'at', qq: 2153389851, text: '@蒸汽人' }
	],
	raw_message: '重庆天气@蒸汽人',
	message_type: 'group',
	sender: {
		user_id: 1480733667,
		nickname: 'Autumn',
		card: '',
		sex: 'unknown',
		age: 0,
		area: '',
		level: 1,
		role: 'owner',
		title: ''
	},
	group_id: 837470119,
	group_name: 'test',
	block: false,
	sub_type: 'normal',
	anonymous: null,
	atme: true,
	atall: false,
	self_id: 2153389851
}
GroupMessage.atme