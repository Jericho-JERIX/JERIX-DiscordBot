module.exports = {
    name: "ping",
    alias: ['ping','p'],
    roleRequirement: [],
    execute: function(message,arg){
        message.channel.send("<:sad_cat:806181269456027648>")
        console.log(message.guild.members.cache.get('226919303700676610'))
        return 0
    }
}