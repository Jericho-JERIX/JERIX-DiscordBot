module.exports = {
    name: "homeworklist",
    alias: ['homeworklist'],
    roleRequirement: [],
    execute: async function(interact,arg,Command){
        interact.deferUpdate()
        var result = await Command.homework.getList(arg[1].toUpperCase(),interact.channelId)
        interact.message.edit(result)
    }
}