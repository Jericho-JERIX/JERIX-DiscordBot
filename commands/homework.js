const {Client,Intents,MessageButton,MessageActionRow, Message} = require('discord.js')
const HW = require('../module/HomeworkList')
var HomeworkList = new HW.HomeworkList()

var button = new MessageActionRow().addComponents(
    new MessageButton().setLabel("📋 All").setStyle("SECONDARY").setCustomId("homeworklist-ALL"),
    new MessageButton().setLabel("📝 Assignment").setStyle("PRIMARY").setCustomId("homeworklist-Assignment"),
    new MessageButton().setLabel("🔔 Alert").setStyle("SUCCESS").setCustomId("homeworklist-Alert"),
    new MessageButton().setLabel("🔥 Exam").setStyle("DANGER").setCustomId("homeworklist-Exam")
)

module.exports = {
    name: "homework",
    alias: ['homework','hw'],
    roleRequirement: [],
    execute: function(message,arg){
        if(arg[1]=="add" || arg[1] == "alert" || arg[1] == "exam"){
                    
            var formatPara = []
            if(Number(arg[2])<10){arg[2] = `0${arg[2]}`}
            if(Number(arg[3])<10){arg[3] = `0${arg[3]}`}
            for(var i=2;i<arg.length;i++){
                formatPara.push(arg[i])
            }

            var add_type = "Assignment"
            if(arg[1] == "alert"){add_type = "Alert"}
            else if(arg[1] == "exam"){add_type = "Exam"}

            message.channel.send({content: HomeworkList.add(formatPara,true,"0000",true,add_type),components: [button]})
            
            if(arg[2]=="u" && message.channel.id != "885898083295186944"){
                message.guild.channels.cache.get("885898083295186944").message.channel.send(HomeworkList.list())
            }
        }
        else if(arg[1]=="list"){
            message.channel.send({content: HomeworkList.list(),components: [button]})
        }
        else if(arg[1]=="delete"){
            message.channel.send({content: HomeworkList.delete(arg[2]),components: [button]})
        }
        else if(arg[1]=="edit"){
            message.channel.send({content: HomeworkList.edit(arg[2],arg[3],arg[4]),components: [button]})
        }
        if(message.channel.id == "862013848943722506"){
            if(!HomeworkList.remaining()){
                message.channel.setName(`📝ไม่มีงานเย้ๆ`)
            }
            else{
                message.channel.setName(`📝homework-${HomeworkList.remaining()}-left`)
            }
        }
        return 0
    },
    getList: function(type='ALL'){
        return HomeworkList.list(type)
    },
    getButton: function(){
        return button
    }
}