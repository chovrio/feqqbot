const { segment } = require("oicq");
const { bot } = require("../index")
bot.on("notice.group.poke", (e) => {
  segment.poke(e.operator_id)
  //bot.sendGroupPoke(e.group_id, e.operator_id)
})