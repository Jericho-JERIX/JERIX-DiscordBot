module.exports = {
    name: "homeworklist",
    alias: ['homeworklist'],
    roleRequirement: [],
    execute: function(interact,arg,Command){
        interact.message.edit(Command.homework.getList(arg[1]))
    }
}