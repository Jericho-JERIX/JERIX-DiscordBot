module.exports = {
    name: "ping",
    alias: ['ping','p'],
    roleRequirement: [],
    execute: function(message,arg){
        message.channel.send("<:sad_cat:806181269456027648>")
        return 0
    }
}