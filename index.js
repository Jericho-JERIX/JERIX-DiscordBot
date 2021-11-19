const {Client,Intents} = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready',()=>{
    console.log("Going Live...")
})

client.login(process.env.TOKEN)

// Command
client.on('messageCreate',(message)=>{
    const Prefix = "j!"
    var arg = message.content.split(' ')

    if(arg[0].slice(0,2) == Prefix){
        var command = arg[0].slice(2)
        switch(command){

            case "p":
            case "ping":
                message.channel.message.channel.send("<:sad_cat:806181269456027648>")
                break

            case "hw":
                var HomeworkList = require('./module/HomeworkList').HomeworkList
                HomeworkList.readFile()
                if(arg[1]=="add"){
                    var formatPara = []
                    if(Number(arg[2])<10){arg[2] = `0${arg[2]}`}
                    if(Number(arg[3])<10){arg[3] = `0${arg[3]}`}
                    for(var i=2;i<arg.length;i++){
                        formatPara.push(arg[i])
                    }
                    message.channel.send(HomeworkList.addHomework(formatPara))
                    if(arg[2]=="u" && message.channel.id != "885898083295186944"){
                        message.guild.channels.cache.get("885898083295186944").message.channel.send(HomeworkList.listHomework())
                    }
                }
                else if(arg[1]=="list"){
                    message.channel.send(HomeworkList.listHomework())
                }
                else if(arg[1]=="delete"){
                    message.channel.send(HomeworkList.deleteHomework(arg[2]))
                }
                else if(arg[1]=="edit"){
                    message.channel.send(HomeworkList.editHomework(arg[2],arg[3],arg[4]))
                }
                if(message.channel.id == "862013848943722506"){
                    if(!HomeworkList.remaining()){
                        message.channel.setName(`📝ไม่มีงานเย้ๆ`)
                    }
                    else{
                        message.channel.setName(`📝homework-${HomeworkList.remaining()}-left`)
                    }
                }
                break
        }
    }
})