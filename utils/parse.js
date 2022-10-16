const { segment } = require("oicq");

//将{face:1}和{br}解析，并回复
module.exports = function parseToReply(text, msg) {
    let regexSeg = /{|}/g
    let regexBr = /{br}/g
    text = text.replace(regexBr, '\n')
    let words = text.split(regexSeg);
    let segWords = words.map( word => {
        if(word.slice(0,5)==='face:'){
            let num = word.slice(5,word.length)
            return segment.face(parseInt(num))
        }
        return word
    }); 
    msg.reply(segWords, true)
}