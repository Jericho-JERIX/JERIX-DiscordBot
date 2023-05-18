const {Client,Intents,MessageButton,MessageActionRow, Message} = require('discord.js')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')

const BtnEvent = require('./module/ButtonEvent')

const YearDivider = require('./module/YearDivider')
const MessageDetector = require('./module/MessageDetector')
const LoginEvent = require('./module/LoginEvent')
const YoutubeVideo = require('./module/YoutubeVideo')

const Counter = new BtnEvent.Counter()
// const ChoiceGame = new ChoiceMatter.Graph()
// var HomeworkList = new HL.HomeworkList()



const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})


// When bot start
client.on('ready',async (test)=>{
    console.log("Going Live...")

    // LoginEvent.homeworkUpdate(client)
    LoginEvent.onlineCount(client)

    // var timeCount = setInterval(async ()=>{
    //     var timeNow = new Today.AtThisTime()
    //     if(timeNow.hour == 0 && timeNow.minute == 1){
    //         var msg = await client.channels.cache.get('885898083295186944').send({content:`${Command.homework.getList('ALL')}`,components: [Command.homework.getButton()]})
    //         msg.crosspost()
    //         setInterval(async ()=>{
    //             var msg = await client.channels.cache.get('885898083295186944').send({content:`${Command.homework.getList('ALL')}`,components: [Command.homework.getButton()]})
    //             msg.crosspost()
    //         },86400000)
    //         clearInterval(timeCount)
    //     }
    // },1000)

    // const GUILD_ID = "300193449301508096"
    // const Guild = client.guilds.cache.get(GUILD_ID)
    // var slash_command;

    // if(Guild){
    //     slash_command = Guild.commands
    // }
    // else{
    //     slash_command = client.application?.commands
    // }

    // slash_command.create({
    //     name:"slashp",
    //     description:"Replies",
    //     type: "CHAT_INPUT",
    // })

})
client.login(process.env.TOKEN)


//TODO--- User Command ---
const CommandList = fs.readdirSync('commands')
var Command = {}

for(var i in CommandList){
    Command[CommandList[i].slice(0,-3)] = require(`./commands/${CommandList[i].slice(0,-3)}`)
}

var Prefix = "b!"
client.on('messageCreate',(message)=>{
    var arg = message.content.split(' ')
    if(arg[0].slice(0,2) == Prefix){
        var command = arg[0].slice(Prefix.length)
        var result = -1
        var executable = false
        for(var i in Command){
            if(Command[i].name == command || Command[i].alias.includes(command)){

                if(Command[i].roleRequirement.length == 0){
                    executable = true
                }
                else{
                    for(var j in Command[i].roleRequirement){
                        if(message.member.roles.cache.some(role => role.id == Command[i].roleRequirement[j])){
                            executable = true
                            break
                        }
                    }
                }

                if(executable){
                    result = Command[i].execute(message,arg)
                }
                else{
                    result = 2
                }
                break
            }
        }

        /* Command Result / Special Execute
           -1 - No Command Found
            0 - Success
            1 - Error(Bad Input)
            2 - Permission Required
        */
        if(result == -1 || result == 0) {}
        else if(result == 1){message.channel.send("Something went Wrong! Please try again")}
        else if(result == 2){message.channel.send("You need Permission!")}
        else if(result[0] == "PREFIX") Prefix = result[1]
    }
})

//TODO--- User Command ---
const InteractionList = fs.readdirSync('interaction')
var Interaction = {}

for(var i in InteractionList){
    Interaction[InteractionList[i].slice(0,-3)] = require(`./interaction/${InteractionList[i].slice(0,-3)}`)
}
// Active Interaction(Button)
client.on('interactionCreate',(interact)=>{
    if(interact.isButton()){
        var arg = interact.customId.split('-')
        switch(arg[0]){
            case "counter":
                Interaction.counter.execute(interact,arg,Counter)
                break

            case "homeworklist":
                Interaction.homeworklist.execute(interact,arg,Command)
                break
        }
    }
})

client.on('messageCreate',async (message)=>{
    // MessageDetector.execute(message)
    if(Math.random() < 0){
        // await YoutubeVideo.execute(message)
    }
})

// Give Year Role
client.on('voiceStateUpdate',(before,after)=>{
    YearDivider.execute(before)
})
