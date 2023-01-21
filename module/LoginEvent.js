const { default: axios } = require("axios")
const { HomeworkTypeButton } = require("../commands/homework")
const HW = require('./HomeworkList')

var HomeworkList = new HW.HomeworkList()

async function getAllChannelHomework(){
    const response = await axios.get(`${HW.HOMEWORK_API}/channel/get-all`)
    return response.data
}

async function sendHomeworklist(client){
    const response = await getAllChannelHomework()
    for(var i in response){
        if(response[i].enable_notification){
            await HomeworkList.init(response[i].selected_file)
            var target_channel = await client.channels.cache.get(i)
            // var message = await target_channel.send({content: Homeworklist.list(),components: [HomeworkTypeButton]})
            var message = await target_channel.send({content: Homeworklist.list(),components: [HomeworkTypeButton]})
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
        },diff_mn)
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