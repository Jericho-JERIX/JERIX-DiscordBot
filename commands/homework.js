const {Client,Intents,MessageButton,MessageActionRow, Message} = require('discord.js')
const { addHomework, getAllHomeworks, createFile, openFile, getAllFiles } = require('../services/homeworklist.service')

const TypeIcon = {
    ASSIGNMENT: "📝",
    ALERT: "🔔",
    EXAM: "🔥"
}

class Homework{
    constructor(homework){
        this.id = homework.homework_id
        this.is_active = homework.is_active
        this.date = homework.date
        this.month = homework.month
        this.year = homework.year
        this.timestamp = homework.timestamp*1000
        this.day_name = homework.day_name.slice(0,3)
        this.type = homework.type
        this.label = homework.label
        
        this.day_left = Math.floor((this.timestamp-Date.now())/86400000)

        this.type_icon = TypeIcon[homework.type]
        this.alert_icon = "⚫"
        if(this.day_left <= 2){this.alert_icon = "⭕"}
        else if(this.day_left <= 5){this.alert_icon = "🟡"}
        else if(this.day_left <= 7){this.alert_icon = "🔵"}
    }
}

function fixSpace(text,n,space=' '){
    let res = String(text)
    while(res.length < n){
        res = space + res
    }
    return res
}

function getYear(d,m){
    const currentYear = Number(String(new Date()).split(' ')[3])
    const duets = new Date(currentYear,m-1,d,23,59,59).getTime()
    const nowts = Date.now()
    if(duets <= nowts){
        return currentYear+1
    }
    return currentYear
}

const Homeworklist = {
    Title: ':bookmark: **Homeworklist 3.0**',
    Button: new MessageActionRow().addComponents(
        new MessageButton().setLabel("📋 All").setStyle("SECONDARY").setCustomId("homeworklist-ALL"),
        new MessageButton().setLabel("📝 Assignment").setStyle("PRIMARY").setCustomId("homeworklist-Assignment"),
        new MessageButton().setLabel("🔔 Alert").setStyle("SUCCESS").setCustomId("homeworklist-Alert"),
        new MessageButton().setLabel("🔥 Exam").setStyle("DANGER").setCustomId("homeworklist-Exam")
    ),
    File: (instance,count) => {
        return `\`\`\`📁 File: ${instance.filename} (${count})\`\`\``
    },
    Card: (instance) => {
        const hw = new Homework(instance)
        return hw.day_left <= 0 ? '' : `[\`${hw.day_name}\`.\`${fixSpace(hw.date,2,'0')}/${fixSpace(hw.month,2,'0')}\`] ${hw.alert_icon} (\`${fixSpace(hw.day_left,3)}\` วัน) ${hw.type_icon} \`[${fixSpace(hw.id,4,'0')}]\` \`${hw.label}\``
    },
    list: async (message) => {
        var { data } = await getAllHomeworks(message.channelId)
        console.log(data)
        var result = data.homeworks.map(homework => Homeworklist.Card(homework)).filter(homework => homework != '')
        console.log(result)
        return `${Homeworklist.Title}\n${Homeworklist.File(data.file,result.length)}${result.length == 0 ? "No Homework!" : result.join('\n')}`
    }
}

// {
//     "homework_id": 1,
//     "file_id": 1,
//     "is_active": true,
//     "date": 10,
//     "month": 3,
//     "year": 2023,
//     "timestamp": 1678467599,
//     "day_name": "Friday",
//     "type": "ASSIGNMENT",
//     "label": "Edited label22"
// }

module.exports = {
    name: "homework",
    alias: ['homework','hw'],
    roleRequirement: [],
    execute: async function(message,arg){
        switch(arg[1]){
            case "add": case "alert": case "exam": case "assignment":
                var format_label = arg.slice(4).join(" ")
                if(arg[1] == "add") arg[1] = "assignment"

                var d = Number(arg[2])
                var m = Number(arg[3])
                var body = {
                    date: d,
                    month: m,
                    year: getYear(d,m),
                    type: arg[1].toUpperCase(),
                    label: format_label
                }
                var { data } = await addHomework(message.author.id,message.channelId,body)
                message.channel.send(await Homeworklist.list(message))
                break
            
            case "list":
                message.channel.send(await Homeworklist.list(message))
                break
            
            case "delete":
                break
            
            case "edit":
                break
            
            case "editlabel":
                break
            
            case "edittype":
                break

            case "open":
                if(!arg[2]){
                    var { data } = await getAllFiles(message.author.id)
                    console.log(data)
                }
                else{
                    openFile(message.author.id,message.channelId,arg[2])
                    .then(async () => {
                        message.channel.send(await Homeworklist.list(message))
                    })
                    .catch(() => {
                        message.channel.send(`${Homeworklist.Title}\n\`\`\`🚫 You don't have permission to open this file!\`\`\``)
                    })
                }
                break
            
            case "create":
                var body = {
                    filename: arg[2]
                }
                var { data } = await createFile(message.author.id,message.channelId,body)
                message.channel.send(`${Homeworklist.Title}\nFile successfully created! \`📁${data.file.filename}\``)
                break
            
            case "noti":
            case "notification":
                break
        }
        // var channelStatus = await HomeworkList.channelInit(message.channelId)
        // if(channelStatus >= 400 && arg[1] != "open" && arg[1] != "create"){
        //     message.channel.send(`${HW.Header}\nYou did't select any folder!`)
        //     return 0
        // }
        // switch(arg[1]){
        //     case "add": case "alert": case "exam": case "assignment":
        //         var format_label = ""
        //         for(var i=4;i<arg.length;i++){
        //             format_label += arg[i]
        //             if(i != arg.length-1){
        //                 format_label += " "
        //             }
        //         }
        //         if(arg[1] == "add") arg[1] = "assignment"
        //         var result = await HomeworkList.add(arg[2],arg[3],format_label,arg[1])
        //         message.channel.send({content: result,components: [button]})
        //         break
            
        //     case "list":
        //         message.channel.send({content: HomeworkList.list(),components: [button]})
        //         break
            
        //     case "delete":
        //         var result = await HomeworkList.delete(arg[2])
        //         message.channel.send({content: result,components: [button]})
        //         break
            
        //     case "edit":
        //         var result = await HomeworkList.editDate(arg[2],arg[3],arg[4])
        //         message.channel.send({content: result,components: [button]})
        //         break
            
        //     case "editlabel":
        //         var format_label = ""
        //         for(var i=3;i<arg.length;i++){
        //             format_label += arg[i]
        //             if(i != arg.length-1){
        //                 format_label += " "
        //             }
        //         }
        //         var result = await HomeworkList.editLabel(arg[2],format_label)
        //         message.channel.send({content: result,components: [button]})
        //         break
            
        //     case "edittype":
        //         var result = await HomeworkList.editType(arg[2],arg[3])
        //         message.channel.send({content: result,components: [button]})
        //         break

        //     case "open":
        //         if(!arg[2]){
        //             const filelist = await getFilelist()
        //             var format_string = `${HW.Header}\n\`\`\`txt\n📁 Available List:\n`
        //             for(var i in filelist.data){
        //                 format_string += ` • ${filelist.data[i]}\n`
        //             }
        //             format_string += '```'
        //             message.channel.send(format_string)
        //             break
        //         }
        //         await HomeworkList.init(arg[2])
        //         await updateChannelFile(message.channelId,arg[2])
        //         message.channel.send({content: HomeworkList.list(),components: [button]})
        //         break
            
        //     case "create":
        //         var result = await HomeworkList.createNewFile(arg[2],arg[3])
        //         message.channel.send(result)
        //         break
            
        //     case "noti":
        //     case "notification":
        //         var response = await setNotification(message.channelId,arg[2] == "on")
        //         if(response.status >= 400) break

        //         if(response.result.enable_notification){
        //             message.channel.send(`${HW.Header}\n:bell: Turn on notification for \`📁${response.result.selected_file}\` in <#${response.result.channelId}>`)
        //         }
        //         else{
        //             message.channel.send(`${HW.Header}\n:no_bell: Turn off notification for \`📁${response.result.selected_file}\` in <#${response.result.channelId}>`)
        //         }
        //         break
        // }
        return 0
    },
    // getList: async function(type='ALL',channelId){
    //     var channelStatus = await HomeworkList.channelInit(channelId)
    //     if(channelStatus >= 400){
    //         return `${HW.Header}\nYou did't select any folder!`
    //     }
    //     return HomeworkList.list(type)
    // },
    // getButton: function(){
    //     return button
    // },
    // HomeworkTypeButton: button
}
