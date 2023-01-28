const { HomeworkTypeButton, list } = require("../commands/homework")
const { getAllChannels } = require("../services/homeworklist.service")

async function sendHomeworklist(client){
    const { data } = await getAllChannels()
    for(var i in data.channels){
        if(data.channels[i].enable_notification){
            var target_channel = await client.channels.cache.get(data.channels[i].channel_id)
            var message = await target_channel.send(await list(data.channels[i].channel_id))
            if(target_channel.type == "GUILD_NEWS"){
                message.crosspost()
            }
        }
    }
}

module.exports = {
    homeworkUpdate: async function(client){
        var today = new Date()
        var tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0,1,0,0)
        var diff_mn = tomorrow-Date.now()

        setTimeout(()=>{
            
            sendHomeworklist(client)
            setInterval(()=>{
                sendHomeworklist(client)
            },86400000)
        },1000)
    },
    onlineCount: function(client){
        var botCount = 0
        setInterval(()=>{
            client.user.setPresence({
                activities : [{
                    name: `Online for ${botCount} minutes!`,
                    type: "PLAYING"
                }]
            })
            botCount+= 1
        },60000)
    }
}