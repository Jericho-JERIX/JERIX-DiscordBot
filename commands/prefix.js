module.exports = {
    name: "prefix",
    alias: [],
    roleRequirement: [569178222495793153],
    execute: function(message,arg){
        message.channel.send(`My Prefix has been set to \`${arg[1]}\``)
        return ["PREFIX",arg[1]]
    }
}