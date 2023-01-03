const { Nametag } = require("../module/HTMLGraphic")

module.exports = {
    name: "text",
    alias: ['text'],
    roleRequirement: [],
    execute: async function(message,arg){
        const graphic = await Nametag(arg[1])
        message.channel.send({files: [graphic]})
        return 0
    }
}