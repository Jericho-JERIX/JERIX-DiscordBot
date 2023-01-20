const { list } = require("../commands/homework")
const { getAllHomeworks } = require("../services/homeworklist.service")

module.exports = {
    name: "homeworklist",
    alias: ['homeworklist'],
    roleRequirement: [],
    execute: async function(interact,arg,Command){
        var result = await list(interact,arg[1])
        console.log(result)
        // var result = await Command.homework.getList(arg[1].toUpperCase(),interact.channelId)
        interact.message.edit(result)
        interact.deferUpdate()
    }
}