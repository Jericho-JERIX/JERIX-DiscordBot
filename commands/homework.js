const {Client,Intents,MessageButton,MessageActionRow, Message} = require('discord.js')
const HW = require('../module/HomeworkList')
const axios = require('axios')
const Homework = "http://localhost:8000/homeworklist"

var HomeworkList = new HW.HomeworkList()

var button = new MessageActionRow().addComponents(
    new MessageButton().setLabel("📋 All").setStyle("SECONDARY").setCustomId("homeworklist-ALL"),
    new MessageButton().setLabel("📝 Assignment").setStyle("PRIMARY").setCustomId("homeworklist-Assignment"),
    new MessageButton().setLabel("🔔 Alert").setStyle("SUCCESS").setCustomId("homeworklist-Alert"),
    new MessageButton().setLabel("🔥 Exam").setStyle("DANGER").setCustomId("homeworklist-Exam")
)

async function getFilelist(){
    const reponse = await axios.get(`${HW.HOMEWORK_API}/get-filelist`)
    return reponse
}

async function updateChannelFile(channelId,filename){
    const reponse = await axios.put(`${HW.HOMEWORK_API}/channel/${channelId}?filename=${filename}`)
    return reponse
}

async function setNotification(channelId,isEnable){
    const reponse = await axios.patch(`${HW.HOMEWORK_API}/channel/${channelId}/notification?isEnable=${String(isEnable)}`)
    return reponse.data
}

module.exports = {
    name: "homework",
    alias: ['homework','hw'],
    roleRequirement: [],
    execute: async function(message,arg){
        var channelStatus = await HomeworkList.channelInit(message.channelId)
        if(channelStatus >= 400 && arg[1] != "open" && arg[1] != "create"){
            message.channel.send(`${HW.Header}\nYou did't select any folder!`)
            return 0
        }
        switch(arg[1]){
            case "add": case "alert": case "exam": case "assignment":
                var format_label = ""
                for(var i=4;i<arg.length;i++){
                    format_label += arg[i]
                    if(i != arg.length-1){
                        format_label += " "
                    }
                }
                if(arg[1] == "add") arg[1] = "assignment"
                var result = await HomeworkList.add(arg[2],arg[3],format_label,arg[1])
                message.channel.send({content: result,components: [button]})
                break
            
            case "list":
                message.channel.send({content: HomeworkList.list(),components: [button]})
                break
            
            case "delete":
                var result = await HomeworkList.delete(arg[2])
                message.channel.send({content: result,components: [button]})
                break
            
            case "edit":
                var result = await HomeworkList.editDate(arg[2],arg[3],arg[4])
                message.channel.send({content: result,components: [button]})
                break
            
            case "editlabel":
                var format_label = ""
                for(var i=3;i<arg.length;i++){
                    format_label += arg[i]
                    if(i != arg.length-1){
                        format_label += " "
                    }
                }
                var result = await HomeworkList.editLabel(arg[2],format_label)
                message.channel.send({content: result,components: [button]})
                break
            
            case "edittype":
                var result = await HomeworkList.editType(arg[2],arg[3])
                message.channel.send({content: result,components: [button]})
                break

            case "open":
                if(!arg[2]){
                    const filelist = await getFilelist()
                    var format_string = `${HW.Header}\n\`\`\`txt\n📁 Available List:\n`
                    for(var i in filelist.data){
                        format_string += ` • ${filelist.data[i]}\n`
                    }
                    format_string += '```'
                    message.channel.send(format_string)
                    break
                }
                await HomeworkList.init(arg[2])
                await updateChannelFile(message.channelId,arg[2])
                message.channel.send({content: HomeworkList.list(),components: [button]})
                break
            
            case "create":
                var result = await HomeworkList.createNewFile(arg[2],arg[3])
                message.channel.send(result)
                break
            
            case "noti":
            case "notification":
                var response = await setNotification(message.channelId,arg[2] == "on")
                if(response.status >= 400) break

                if(response.result.enable_notification){
                    message.channel.send(`${HW.Header}\n:bell: Turn on notification for \`📁${response.result.selected_file}\` in <#${response.result.channelId}>`)
                }
                else{
                    message.channel.send(`${HW.Header}\n:no_bell: Turn off notification for \`📁${response.result.selected_file}\` in <#${response.result.channelId}>`)
                }
                break
        }
        return 0
    },
    getList: async function(type='ALL',channelId){
        var channelStatus = await HomeworkList.channelInit(channelId)
        if(channelStatus >= 400){
            return `${HW.Header}\nYou did't select any folder!`
        }
        return HomeworkList.list(type)
    },
    getButton: function(){
        return button
    },
    HomeworkTypeButton: button
}
