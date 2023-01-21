const { list, ReCreateButtonSelector } = require("../commands/homework")
const { getAllHomeworks, openFile } = require("../services/homeworklist.service")

module.exports = {
    name: "homeworklist",
    alias: ['homeworklist'],
    roleRequirement: [],
    execute: async function(interact,arg,Command){
        switch(arg[1]){
            case "Type":
                var result = await list(interact.channelId,arg[2])
                interact.message.edit(result)
                break
            
            case "OpenFile":
                await openFile(interact.user.id,interact.channelId,arg[3])
                interact.message.channel.send(await list(interact.channelId))
                var result = await ReCreateButtonSelector(arg[2],interact.channelId)
                interact.message.edit({components: [result]})
                break
        }
        
        interact.deferUpdate()
    }
}