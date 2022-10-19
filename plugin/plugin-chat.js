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
const message = [
    {
        type: 'json',
        data: '{"app":"com.tencent.structmsg","desc":"新闻","view":"news","ver":"0.0.0.1","prompt":"[分享]光盘ing | 1w餐券等你兑换！——勤俭节约，拒绝“剩”宴…","meta":{"news":{"action":"","android_pkg_name":"","app_type":1,"appid":1103188687,"ctime":1665980277,"desc":" ","jumpUrl":"http:\\/\\/mp.weixin.qq.com\\/s?__biz=MjM5NDAzNDM2MQ==&mid=2653769629&idx=1&sn=6027d4278601d5c2c3104a0a8752883f&chksm=bd54084b8a23815d9d5f1b1b3e7fd2d4df5e755e6df0c05e67d570f64adb04d88eb4bbb1f97f&mpshare=1&scene=23&srcid=1017Px1NcCK07sA1F6G519TE&sharer_sharetime=1665980273249&sharer_shareid=8e9e7e5e1192e388b67b4ea35f4ae340#rd","preview":"https:\\/\\/mmbiz.qpic.cn\\/mmbiz_jpg\\/ZYxm3AuFUGZXbPwXjUaTxougCXyOW6T3Nmno4FdzmdwID3mspaXGwygZbvqH9ln0BaPRoDuzRYyurEfjVqicfNw\\/300?wx_fmt=jpeg&wxfrom=7","source_icon":"https:\\/\\/p.qpic.cn\\/qqconnect\\/0\\/app_1103188687_1658800746\\/100?max-age=2592000&t=0","source_url":"","tag":"微信","title":"光盘ing | 1w餐券等你兑换！——勤俭节约，拒绝“剩”宴…","uin":1480733667}},"config":{"ctime":1665980277,"forward":true,"token":"32cc3fa75f34dd395b9f133c533218a0","type":"normal"}}',
        id: undefined
    }
]
bot.on("message", (msg) => {
    if (msg.atme) {
        let text;
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
            case judge(['光盘']):
                msg.reply(message)
                break;
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
                msg.reply(`7 个少见但有用的 HTML 属性：https://juejin.cn/post/7085863634449989639\nhtml篇--这可能是目前较为全面的html面试知识点了吧：https://juejin.cn/post/6844904180943945742\nCSS 实现多行文本“展开收起”：https://juejin.cn/post/6963904955262435336\n如何用 CSS 中写出超级美丽的阴影效果：https://juejin.cn/post/7034323356459466760\nCSS 奇思妙想边框动画：https://juejin.cn/post/6918921604160290830`, true)
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