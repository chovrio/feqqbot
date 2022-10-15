const bot = require("../index")
const { segment } = require("oicq")

let count = (function (repeat = 2) {
    let value = '';
    let count = 0;
    return (msg) => {
        if (msg === value) count++;
        else {
            value = msg;
            count = 0;
        }
        if (count === repeat) {
            return true;
        } else return false;
    }
})()

bot.on('message.group', ({ raw_message }) => {
    if (count(raw_message)) e.reply([
        raw_message
    ])
})