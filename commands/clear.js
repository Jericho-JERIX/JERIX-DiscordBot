module.exports = {
    name: "clear",
    alias: [],
    roleRequirement: [569178222495793153],
    execute: function(message,arg){
        message.channel.bulkDelete(parseInt(arg[1]) + 1)
        return 0
    }
}