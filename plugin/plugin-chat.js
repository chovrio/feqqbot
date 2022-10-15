"use strict"
const { segment } = require("oicq")
const { bot, users } = require("../index")
const reply = require("../reply.json")
const weather = require("./plugin-weather")
const augur = require("./plugin-augur")

bot.on("message", (msg) => {
    if (msg.atme) {
        // console.log(reply);
        // console.log(msg);
        let text = msg.message[1].text.trim();
        //console.log(text);
        /**
         * @param {string []} strArr 
         */

        let judge = (strArr) => {
            console.log(strArr);
            let flag = true
            strArr.map((item) => {
                if (!text.includes(item)) flag = false
            })
            return flag
        }
        switch (true) {
            case judge(['help']):
                msg.reply(
                    `试试问我以下问题叭\n【提问清单】\n${reply.help.map((item) => {
                        return `\n${item}`
                    }).join('')}
                `
                    , true);
                break;
            case judge(['天气']):
                weather(msg);
                break;
            case judge(['前端介绍']):
                msg.reply(`将想法画成现实，让代码激发可能\n剑客手中有干将、鱼肠、湛卢\n我们手中有HTML，CSS，Js\n我们能够在Web的世界里绘画出绚丽的光景\n我们亦能借助Node.js，TS，React等工具\n让代码激发无限潜能，创造属于自己的一万种可能\n在这座充满刀光剑影、快意恩仇的互联网江湖里，更多的前端知识宝藏等你来寻找`, true);
                break;
            case judge(['提交']):
                msg.reply("我们提交作业的邮箱地址是：fe@redrock.team", true);
                break;
            case judge(['推文']):
                msg.reply(`先睹为快即将到来的HTML6：https://juejin.cn/post/7032874253573685261\n7 个少见但有用的 HTML 属性：https://juejin.cn/post/7085863634449989639\nhtml篇--这可能是目前较为全面的html面试知识点了吧：https://juejin.cn/post/6844904180943945742`, true)
                break;
            case judge(['抽签']):
                augur(msg);
                break;
            case judge(['解签']):
                augur(msg);
                break;
            default:
                msg.reply("不知道你要干嘛，试着对我发送help吧!", true)
                break;
        }
    }
})