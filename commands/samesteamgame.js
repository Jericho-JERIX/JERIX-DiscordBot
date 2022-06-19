const Steam = require('../module/Steam')

module.exports = {
    name: "samesteamgames",
    alias: ['samesteamgames','ssg'],
    roleRequirement: [],
    execute: async function(message,arg){
        const result = await Steam.getSameGame(arg[1],arg[2])
        // console.log(result)
        let format_string = ""

        for(var i in result){
            format_string += `• ${result[i]}\n`
        }
        console.log(format_string)
        message.channel.send(format_string)
        return 0
    }
}