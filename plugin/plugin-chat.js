"use strict"
const { bot } = require("../index")
const reply = require("../reply.json")
const weather = require("./plugin-weather")
const augur = require("./plugin-augur")
const { segment } = require("oicq");
const path = require("path");
const message1 = [
    "不知道你要干嘛，试着对我发送help吧!",
    segment.face(300),
    segment.image(path.join(__dirname, '../img/dancun.jpg'))
]
bot.on("message", (msg) => {
    if (msg.atme) {
        let text;
        console.log(msg.message);
        msg.message.map((item) => {
            if (item.type == 'text') {
                text = item.text.trim()
            }
        })
        /**
         * @param {string []} strArr 
         */
        let judge = (strArr) => {
            let flag = true
            strArr.map((item) => {
                if (!eval(`/${item}/`).test(text)) flag = false
            })
            return flag
        }
        switch (true) {
            case judge(['help']):
                msg.reply(
                    `试试问我以下问题叭\n【提问清单】${reply.help.map((item) => {
                        return `\n${item}`
                    }).join('')}`, true);
                break;
            case judge(['查看天气']):
                msg.reply("查询格式：城市+天气", true)
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
                msg.reply(`先睹为快即将到来的HTML6：https://juejin.cn/post/7032874253573685261\n7 个少见但有用的 HTML 属性：https://juejin.cn/post/7085863634449989639\nhtml篇--这可能是目前较为全面的html面试知识点了吧：https://juejin.cn/post/6844904180943945742\nCSS 实现多行文本“展开收起”：https://juejin.cn/post/6963904955262435336\n如何用 CSS 中写出超级美丽的阴影效果：https://juejin.cn/post/7034323356459466760`, true)
                break;
            case judge(['抽签']):
                augur(msg);
                break;
            case judge(['解签']):
                augur(msg);
                break;
            case judge(['不明所以']):
                augur(msg)
                break;
            default:
                // aiReply(msg)
                msg.reply(message1, true)
                break;
        }
    }
})