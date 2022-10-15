const { segment } = require("oicq");
const { bot } = require("../index")


bot.on("notice.group.poke", (e) => {
  if (e.target_id === e.self_id) {
    bot.sendGroupPoke(e.group_id, e.operator_id)
  }
})